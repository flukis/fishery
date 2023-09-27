import { ReactNode } from "react";

export default function Paper({ children }: { children: ReactNode }) {
  return <div className="paper">{children}</div>;
}
