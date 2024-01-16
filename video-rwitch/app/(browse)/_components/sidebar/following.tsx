"use client"

import { useSidebar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";


interface FollowingProps {
    data: (Follow & {
        following: User & {
            stream: Stream | null
        }
    })[]
}

export const Following = ({ data }: FollowingProps) => {

    const { collapsed } = useSidebar((state) => state);

    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Following
                    </p>
                </div>
            )}
            <ul className="px-2 space-y-2 ">
                {data.map((user) => (
                    <UserItem
                        key={user.id}
                        username={user.following.username}
                        imageUrl={user.following.imageUrl}
                        isLive={user.following.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}