import { Story } from "../generated/story";
import { story } from "@prisma/client";

export const reflect = (object: story): Story => {
    const storyObject: Story = {
        id: object.id,
        image: object.image,
        userId: object.userId,
        createdAt: !!object.createdAt ? object.createdAt.toISOString() : '',
        updatedAt: !!object.updateAt ? object.updateAt.toISOString() : '',
        deletedAt: !!object.deletedAt ? object.deletedAt.toISOString() : '',
    }

    return storyObject
}