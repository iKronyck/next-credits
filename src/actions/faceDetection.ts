import axios from "axios";
import { ApiService } from "../utils/api";

export async function compareImages(file1: File, file2: string) {
  try {
    const response = await axios.post<{ confidence: number }>(
      process.env.FACE_URL as string,
      {
        api_key: process.env.FACE_PUBLIC_KEY,
        api_secret: process.env.FACE_SECRET_KEY,
        image_file1: file1,
        image_base64_2: file2,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.confidence > 60;
  } catch (err) {
    console.log(err);
  }
}
