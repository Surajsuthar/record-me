"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { tree } from "next/dist/build/templates/app-page";
import nodemailer from "nodemailer";
import { use } from "react";

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    to,
    subject,
    text,
    html
  }

  return { transporter, mailOptions }
}

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

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const userData = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });

    if (userData) {
      return { status: 200, data: userData.firstView };
    }

    return { status: 400, data: false };
  } catch (error) {
    return { status: 401 };
  }
};

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const view = await db.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
    });

    if (view) {
      return { status: 200, data: "Setting updated" };
    }
  } catch (error) {
    return { status: 401 };
  }
};

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId?: string | undefined,
) => {
  try {
    if(commentId) {
      const reply = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          reply: {
            create: {
              comment,
              userId,
              videoId,
            },
          },
        },
      });
  
      if (reply) {
        return { status: 200, data: "replay posted" };
      }
  
    }
    const newComment = await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        Comment: {
          create: {
            comment,
            userId,
          },
        },
      },
    });

    if (newComment) return { status: 200, data: "new comment added" };
  } catch (error) {
    return { status: 400 };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const profileIdAndImage = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        image: true,
        id: true,
      },
    });

    if (profileIdAndImage) return { status: 200, data: profileIdAndImage };
  } catch (error) {
    return { status: 400 };
  }
};

export const getVideoComments = async (Id: string) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        OR: [{ videoId: Id }, { commentId: Id }],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    })

    return { status: 200, data: comments }
  } catch (error) {
    return { status: 400 }
  }
}

export const inviteuser = async (
  workSpaceId: string,
  recieverId: string,
  email: string
) => {
  try {
    const user = await currentUser()
    if(!user) {
      return { status: 400 }
    }
  
    const senderInfo = await db.user.findUnique({
      where: {
        clerkid: user.id
      },
      select: {
        id: true,
        firstname: true,
        lastname: true
      }
    })
  
    if(senderInfo?.id) {
      const workspace = await db.workSpace.findUnique({
        where: {
          id: workSpaceId
        },
        select: {
          name: true
        }
      })
  
      if(workspace) {
        const invitation = await db.invite.create({
          data: {
            senderId: senderInfo.id,
            recieverId,
            content: `You are invited to join ${workspace.name} Workspace, click the link to accept the invitation`,
            workSpaceId,
          },
          select: {
            id: true
          }
        })
        
        const notification = await db.user.update({
          where: {
            clerkid: recieverId
          },
          data: {
            notification: {
              create: {
                content: `${user.firstName} ${user.lastName} invited ${senderInfo.firstname}`,
              }
            }
          }
        })
  
        if(invitation) {
            const { transporter, mailOptions } = await sendMail(
              email, 
              `Invitation to join ${workspace.name}`, 
              `You are invited to join ${workspace.name} Workspace, click the link to accept the invitation`,
              `<a href="${process.env.NEXT_PUBLIC_APP_URL}/invite/${invitation.id}">Accept Invitation</a>`
            )
  
            await transporter.sendMail(mailOptions, async (err, info) => {
              if(err) {
                console.log(err)
              }else {
                console.log("Email sent",info)
              }
            })
  
          return { status: 200, data: "invitation sent" }
        }
        return { status: 400, data: "invitation failde" }
      }
  
      return { status: 400, data: "workspace not found" }
    }

    return { status: 400, data: "sender info not found" }
  } catch (error) {
    return { status: 400, data: "invitation failed" }
  }
}

export const acceptInvitation = async (inviteId: string) => {
  try {
    const user = await currentUser()
    if(!user) {
      return { status: 404 }
    }

    const invitation = await db.invite.findUnique({
      where: {
        id: inviteId
      },
      select: {
        workSpaceId: true,
        reciever: {
          select: {
            clerkid: true,
          }
        }
      }
    })

    if(user.id !== invitation?.reciever?.clerkid) {
      return { status: 401 }
    }

    const acceptInvite = await db.invite.update({
      where:{
        id: inviteId
      },
      data: {
        accepted: true
      }
    })

    const updateMember = await db.user.update({
      where: {
        clerkid: user.id
      },
      data: {
        members : {
          create : {
            workSpaceId: invitation.workSpaceId,
          }
        }
      }
    })

    if(acceptInvite && updateMember) {
    return { status: 200, data: "invitation accepted" }
   }

   return { status: 400, data: "invitation failed" }

  } catch (error) {
    return { status: 400, data: "invitation failed" }
  }
}

export const sendMailForFirstView = async (videoId: string) => {
  try {
    const user = await currentUser()
    if(!user) {
      return { status: 404 }
    }

    const firstViewSetting = await db.user.findUnique({
      where: {
        clerkid: user.id
      },
      select: {
        firstView: true
      }
    })

    if(!firstViewSetting?.firstView) {  
      return { status: 400 }
    }

    const video = await db.video.findUnique({
      where: {
        id: videoId
      },
      select: {
        title:true,
        views: true,
        User: {
          select: { email: true}
        }
      }
    })

    if(video && video.views === 1) {
      db.video.update({
        where: {
          id: videoId
        },
        data: {
          views: {
            increment: 1
          }
        }
      })

      if(!video) return { status: 400 }

      const { transporter, mailOptions } = await sendMail(
        video.User?.email!, 
        "you got First View", 
        `You got your first view on your video ${video.title}, click the link to view the video`,
      )

      await transporter.sendMail(mailOptions, async (err, info) => {
        if(err) {
          console.log(err)
        }
        else {
          const notification = await db.user.update({
            where: {
              clerkid: user.id
            },
            data: {
              notification: {
                create: {
                  content: mailOptions.text
                }
              }
            }
          })

          if(notification) {
            return { status: 200, data: "email sent" }
          }

          return { status: 400, data: "email not sent" }
        }
      })
    }
  } catch (error) {
    return { status: 400, data: "email not sent" }
  }
}