import { IUser } from "@/entities/user";
import { DataCard } from "./DataCard";
import { DataCardSkeleton } from "./DataCardSkeleton";

interface CardsListProps {
  isLoading: boolean;
  users: IUser[];
}

export const CardsList: React.FC<CardsListProps> = ({ users, isLoading }) => {
  if (isLoading)
    return (
      <section className="pt-8 w-full">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(10)
              .fill(0)
              .map(() => (
                <DataCardSkeleton key={Math.random()} />
              ))}
          </div>
        </div>
      </section>
    );

  return (
    <section className="pt-8 w-full">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {!users.length && (
            <p className="text-lg font-semibold">No data found</p>
          )}

          {users.map((user) => (
            <DataCard key={user.userId} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};
