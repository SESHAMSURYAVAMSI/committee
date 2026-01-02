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

  /* ✅ INITIAL STATE (NO EFFECT, NO WARNING) */
  const [active, setActive] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    if (!categories.length) return null;

    const hash = window.location.hash.replace("#", "");
    const matched = categories.find(
      c => slugify(c) === hash
    );

    return matched || categories[0];
  });

  /* ✅ LISTEN to hash changes (external system) */
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

  /* ✅ Handle click: update React state + URL */
  function handleCategoryClick(category: string) {
    const slug = slugify(category);
    setActive(category);
    router.replace(`#${slug}`, { scroll: false });
  }

  /* Guard */
  if (!active) return null;

  return (
    <div className="space-y-10">
      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-3 border-b pb-4">
        {categories.map(category => {
          const isActive = active === category;

          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition
                ${
                  isActive
                    ? "bg-orange-500 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
            >
              {category}
            </button>
          );
        })}
      </div>

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
