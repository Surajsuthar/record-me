"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const isUserInWorkSpace = await db.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    // console.log("isUserInWorkSpace", isUserInWorkSpace);

    return {
      status: 200,
      data: { workspace: isUserInWorkSpace },
    };
  } catch (error) {
    return {
      status: 403,
      data: { workspace: null },
    };
  }
};

export const getWorkSpaceFolder = async (workSpaceId: string) => {
  try {
    const isFolderExist = await db.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolderExist && isFolderExist.length > 0) {
      return { status: 200, data: isFolderExist };
    }

    return { status: 400, data: [] };
  } catch (error) {
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const videos = await db.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }

    return { status: 400, data: "No videos found" };
  } catch (error) {
    return { status: 403 };
  }
};

export const getWorkspaces = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const workspaces = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return { status: 200, data: workspaces };
    }

    return { status: 400 };
  } catch (error) {
    return { status: 403 };
  }
};

export const renameFolder = async (id: string, name: string) => {
  try {
    const foldername = await db.folder.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });

    if (foldername) {
      return { status: 200, data: "Folder Renamed" };
    }
    return { status: 400, data: "Folder does not exist" };
  } catch (error) {
    return { status: 500, data: "Opps! something went wrong" };
  }
};

export const CreateFolders = async (workspaceId: string) => {
  try {
    const isNewFolder = await db.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: { name: "Untitled" },
        },
      },
    });

    if (isNewFolder) {
      return { status: 200, message: "New Folder created" };
    }
    return { status: 400 };
  } catch (error) {
    return { status: 500, message: "Oops something went wroung" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await db.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) {
      return { status: 200, data: folder };
    }

    return { status: 400, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  folderId: string,
  workSpaceId: string,
) => {
  try {
    const location = await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId: workSpaceId || null,
      },
    });

    if (location) {
      return { status: 200, data: "folder changed successfully" };
    }
    return { status: 400, data: "folder/workspace not found" };
  } catch (error) {
    return { status: 400, data: "Opps! something went wroung" };
  }
};

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const video = await db.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summery: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.User?.clerkid ? true : false,
      };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 404 };
  }
};
