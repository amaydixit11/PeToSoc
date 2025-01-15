import { Table } from "@/components/Table";
import { SOCIETIES } from "@/data/societies";

export default function Home() {
  return (
    <main>
      <Table societies={SOCIETIES} />
    </main>
  );
}
