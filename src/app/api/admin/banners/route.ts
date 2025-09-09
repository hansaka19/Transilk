import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'admin_banners.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const data = readData();
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = readData();
    // if contains id, update, else prepend
    if (body.id) {
      const next = current.map((b: any) => (b.id === body.id ? { ...b, ...body } : b));
      writeData(next);
      return NextResponse.json({ data: next });
    }
    const id = `b_${Date.now()}`;
    const newB = { id, ...body };
    const next = [newB, ...current];
    writeData(next);
    return NextResponse.json({ data: next });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const current = readData();
    const next = current.map((b: any) => (b.id === body.id ? { ...b, ...body } : b));
    writeData(next);
    return NextResponse.json({ data: next });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const current = readData();
    const next = current.filter((b: any) => b.id !== id);
    writeData(next);
    return NextResponse.json({ data: next });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
