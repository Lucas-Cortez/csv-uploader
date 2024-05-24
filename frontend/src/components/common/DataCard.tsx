import { IUser } from "@/entities/user";
import { Card, CardContent } from "../ui/card";

interface DataCardProps {
  user: IUser;
}

export const DataCard: React.FC<DataCardProps> = ({ user }) => {
  return (
    <Card className="min-w-60" data-testid="info-card">
      <CardContent className="text-sm pt-6">
        <li>
          <span className="font-semibold">Name</span>: {user.name}
        </li>
        <li>
          <span className="font-semibold">City</span>: {user.city}
        </li>
        <li>
          <span className="font-semibold">Country</span>: {user.country}
        </li>
        <li>
          <span className="font-semibold">Favorite Sport</span>:{" "}
          {user.favoriteSport}
        </li>
      </CardContent>
    </Card>
  );
};
