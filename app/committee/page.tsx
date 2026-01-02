import fs from "fs";
import path from "path";
import Image from "next/image";
import { CommitteeMember } from "@/types/committee";
import CommitteeTabs from "@/components/committee/CommitteeTabs";

type CSVRow = {
  name?: string;
  designation?: string;
  category?: string;
  image?: string;
};


async function getCommitteeData(): Promise<CommitteeMember[]> {
  const filePath = path.join(
    process.cwd(),
    "public/data/committee.csv"
  );

  const csv = fs.readFileSync(filePath, "utf-8");

  const lines = csv
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean);

  const headers = lines[0]
    .replace(/^\uFEFF/, "")
    .split(",")
    .map(h => h.trim().toLowerCase());

  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    const record: CSVRow  = {};

    headers.forEach((h, i) => {
      record[h as keyof CSVRow] = values[i] || "";
    });

    return {
      name: record.name || "",
      designation: record.designation || "",
      category: record.category || "Uncategorized",
      image: record.image || "",
    };
  });
}

export default async function CommitteePage() {
  const data = await getCommitteeData();

  const categories = Array.from(
    new Set(data.map(m => m.category))
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Image
            src="https://www.aoicon2026kolkata.com/assets/images/logo.png"
            alt="AOICON 2026"
            width={120}
            height={120}
            className="w-40 h-20 object-contain"
          />
          <h1 className=" text-2xl font-bold text-gray-900 text-center">
            AOICON 2026 Committee
          </h1>
        </div>
      </header>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <CommitteeTabs
          categories={categories}
          data={data}
        />
      </div>
    </main>
  );
}
