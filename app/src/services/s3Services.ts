import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";


const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION, 
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY as string, 
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string, 
  },
});


export async function uploadFile(bucketName: string, file: File): Promise<string | null> {
  try {
    const folderName = file.name.split('.')[0];
    const key = `${folderName}/${file.name}`;   // File will be stored in "folderName/file.name"

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${bucketName}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${key}`;

    return fileUrl;
  } catch (err) {
    console.error("Error uploading file:", err);
    return null;
  }
}
  