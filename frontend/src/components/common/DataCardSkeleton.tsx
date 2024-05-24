import { Card, CardContent } from "../ui/card";

export const DataCardSkeleton: React.FC = () => {
  return (
    <Card className="min-w-60" data-testid="info-card-skeleton">
      <CardContent className="text-sm pt-6 ">
        <div className="animate-pulse bg-slate-400 h-4 w-full rounded-sm inline-block"></div>
        <div className="animate-pulse bg-slate-400 h-4 w-full rounded-sm inline-block"></div>
        <div className="animate-pulse bg-slate-400 h-4 w-full rounded-sm inline-block"></div>
        <div className="animate-pulse bg-slate-400 h-4 w-full rounded-sm inline-block"></div>
      </CardContent>
    </Card>
  );
};
