import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    uploadDir: './public/uploads',
  });

 
  if (!fs.existsSync('./public/uploads')) {
    fs.mkdirSync('./public/uploads', { recursive: true });
  }

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing file:', err);
        reject(NextResponse.json({ error: 'Error parsing file' }, { status: 500 }));
        return;
      }
      console.log('Uploaded files:', files);
      resolve(NextResponse.json({ message: 'File uploaded successfully', files }));
    });
  });
}
