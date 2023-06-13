import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises";

import { Table } from "@/stores/tablesStores";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  return NextResponse.json({ test: "test" });
}
