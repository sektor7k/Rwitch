import { LiveBadge } from "@/components/live-badge";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { User, Stream } from "@prisma/client";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
    data: {
        user: User;
        isLive: boolean;
        name: string;
        thumbnailUrl: string | null;
    }
};

export const ResultCard = ({
    data
}: ResultCardProps) => {

    return (
        <Link href={`/${data.user.username}`}>
            <div className="w-full h-full space-y-4 ">
                <Thumbnail
                    src={data.thumbnailUrl}
                    fallback={data.user.imageUrl}
                    isLive={data.isLive}
                    username={data.user.username}
                />
                <div className="flex gap-x-3">
                    <UserAvatar
                        username={data.user.username}
                        imageUrl={data.user.imageUrl}
                        isLive={data.isLive}
                    />
                    <div className="flex flex-col overflow-hidden text-sm ">
                        <p className="font-semibold truncate hover:text-blue-500">
                            {data.name}
                        </p>
                        <p className=" text-muted-foreground">
                            {data.user.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export const ResultCardSkeleton = () => {

    return (
        <div className="w-full h-full space-y-4 ">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-3" />
                </div>
            </div>
        </div>
    );
};