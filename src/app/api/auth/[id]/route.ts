import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const userProfile = await db.user.findUnique({
      where: {
        clerkid: id,
      },
      include: {
          studio: true,
          subscription: {
              select: {
                  plan: true,
              }
          }
      }
    });
  
    if (userProfile) {
      return NextResponse.json({ user: userProfile }, { status: 200 });
    }
  
    const clerkUser = await clerkClient();
    const user = await clerkUser.users.getUser(id);
  
    const createUser = await db.user.create({
      data:{
        clerkid: params.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        studio: {
          create: {}
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL"
          }
        },
        subscription: {
          create: {}
        },
      },
      include: {
        subscription: {
          select: {
            plan: true
          }
        }
      }
    })
  
    if(createUser) {
      return NextResponse.json({ status: 201, user: createUser });
    }
  
    
  
    return NextResponse.json({ status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}