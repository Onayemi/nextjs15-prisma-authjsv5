import { MoveDownLeft, MoveUpRight } from "lucide-react";

export const Stats3 = () => (
  <div className="w-full py-5 lg:py-10">
    <div className="container mx-auto">
      <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8">
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md shadow">
          <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            500.000
            <span className="text-muted-foreground text-sm tracking-normal">
              +20.1%
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
            Monthly active users
          </p>
        </div>
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md shadow">
          <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            20.105
            <span className="text-muted-foreground text-sm tracking-normal">
              -2%
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
            Daily active users
          </p>
        </div>
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md shadow">
          <MoveUpRight className="w-4 h-4 mb-10 text-success" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            $523.520
            <span className="text-muted-foreground text-sm tracking-normal">
              +8%
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
            Monthly recurring revenue
          </p>
        </div>
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md shadow">
          <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            $1052
            <span className="text-muted-foreground text-sm tracking-normal">
              +2%
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
            Cost per acquisition
          </p>
        </div>
      </div>
    </div>
  </div>
);
