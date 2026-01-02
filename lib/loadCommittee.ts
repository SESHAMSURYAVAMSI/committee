import fs from "fs";
import path from "path";

export type CommitteeMember = {
  name: string;
  designation: string;
  category: string;
  image?: string;
};

export function loadCommitteeData(): CommitteeMember[] {
  const filePath = path.join(process.cwd(), "data", "committees.csv");
  const file = fs.readFileSync(filePath, "utf-8");

  const lines = file.split("\n").filter(Boolean);
  lines.shift(); // remove header

  return lines.map(line => {
    const [name, designation, category, image] = line.split(",");

    return {
      name: name?.trim(),
      designation: designation?.trim(),
      category: category?.trim(),
      image: image?.trim(),
    };
  });
}
