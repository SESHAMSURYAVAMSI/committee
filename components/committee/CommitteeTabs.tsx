"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CommitteeMember } from "@/types/committee";
import CommitteeGrid from "./CommitteeGrid";

/* ---------- helper ---------- */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type Props = {
  categories?: string[];
  data: CommitteeMember[];
};

export default function CommitteeTabs({ categories = [], data }: Props) {
  const router = useRouter();

  /* INITIAL ACTIVE CATEGORY */
  const [active, setActive] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    if (!categories.length) return null;

    const hash = window.location.hash.replace("#", "");
    const matched = categories.find(
      c => slugify(c) === hash
    );

    return matched || categories[0];
  });

  /* LISTEN TO HASH CHANGES */
  useEffect(() => {
    if (!categories.length) return;

    function onHashChange() {
      const hash = window.location.hash.replace("#", "");
      const matched = categories.find(
        c => slugify(c) === hash
      );
      if (matched) {
        setActive(matched);
      }
    }

    window.addEventListener("hashchange", onHashChange);
    return () =>
      window.removeEventListener("hashchange", onHashChange);
  }, [categories]);

  /* Guard */
  if (!active) return null;

  return (
    <div className="space-y-6">
      {/* CATEGORY TITLE */}
      {/* <h2 className="text-xl font-bold text-gray-900">
        {active}
      </h2> */}

      {/* ACTIVE CATEGORY CONTENT */}
      <CommitteeGrid
        title={active}
        members={data.filter(
          m => m.category === active
        )}
      />
    </div>
  );
}
