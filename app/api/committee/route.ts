import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public/data/committee.csv"
  );

  const file = fs.readFileSync(filePath, "utf-8");

  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return NextResponse.json(records);
}
