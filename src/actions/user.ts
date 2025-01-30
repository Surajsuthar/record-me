"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUse = async () => {
    try {

        const user = await currentUser()
        if(!user) {
            return { status: 403 }
        }
        const userExist = await db.user.findUnique({
            where: {
                clearkid: user.id
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id
                        }
                    }
                }
            }
        }) 

        if(userExist) {
            return { status: 200, user: userExist }
        }

        const newUser = await db.user.create({
            data: {
                clearkid: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                image: user.imageUrl,
                studio: {
                    create: {}
                },
                subscription: {
                    create: {}
                },
                workspace: {
                    create: {
                        name: `${user.firstName}'s workspace`,
                        type: 'PERSNOL'
                    }
                }
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id
                        }
                    }
                },
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if(newUser) {
            return { status: 201, user: newUser }
        }

        return { status: 400 }
    } catch (error) {
        return { status: 400 }
    }
}