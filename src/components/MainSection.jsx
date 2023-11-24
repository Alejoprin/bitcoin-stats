import { TopInfo } from "./TopInfo";
import { CentralInfo } from "./CentralInfo";
import { BottomInfo } from "./BottomInfo";

export function MainSection() {
  return (
    <section className="w-3/4 h-full flex flex-col ">
      <TopInfo />

      <CentralInfo />

      <BottomInfo />
    </section>
  );
}
