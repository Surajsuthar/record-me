"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUse = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
    const userExist = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (userExist) {
      return { status: 200, user: userExist };
    }

    const newUser = await db.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser) {
      return { status: 201, user: newUser };
    }

    return { status: 400 };
  } catch (error) {
    return { status: 400 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const notifications = await db.user.findUnique({
      where: {
        clerkid: user?.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length > 0) {
      return { data: notifications };
    }

    return { status: 400, data: [] };
  } catch (error) {
    return { status: 403, data: [] };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const users = await db.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { lastname: { contains: query } },
          { email: { contains: query } },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        email: true,
        image: true,
      },
    });

    if (users && users.length > 0) {
      return { status: 200, data: users };
    }

    return { status: 404, data: undefined };
  } catch (error) {
    return { status: 500, data: undefined };
  }
};

export const CreateWorkspace = async (name: string) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const autorized = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (autorized?.subscription?.plan === "PRO") {
      const workSpace = await db.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });

      if (workSpace) return { status: 200, data: "workspace created" };
    }

    return {
      status: 401,
      data: "You are not authorizes",
    };
  } catch (error) {
    return { status: 403 };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const payment = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: { plan: true },
        },
      },
    });

    if (payment) return { status: 200, data: payment };
  } catch (error) {
    return { status: 400 };
  }
};
