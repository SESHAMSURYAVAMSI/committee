import MemberCard from "./MemberCard";
import { CommitteeMember } from "@/types/committee";

type Props = {
  title: string;
  members: CommitteeMember[];
};

export default function CommitteeGrid({ title, members }: Props) {
  return (
    <section className="space-y-6">
      {/* CATEGORY HEADER */}
      <div className="flex items-center justify-between rounded-xl border bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 rounded bg-orange-500" />
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
        </div>

        {/* <span className="text-sm font-medium text-gray-500">
          {members.length} Members
        </span> */}
      </div>

      {/* ONE PERSON PER ROW */}
      <div className="flex flex-col gap-3">
        {members.map((m, i) => (
          <MemberCard key={i} {...m} />
        ))}
      </div>
    </section>
  );
}
