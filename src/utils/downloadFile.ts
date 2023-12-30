import saveAs from "file-saver";
import JSZip from "jszip";

export const handleDownload = (url: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export async function downloadAsZip(urls: { url: string, name: string }[], studentInfo: { studentName: string, curso: string }) {
    const zip = new JSZip();

    for (const url of urls) {
        const response = await fetch(url.url);
        const blob = await response.blob();
        zip.file(`${url.name}.stl`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${studentInfo.studentName}_${studentInfo.curso}_${Date.now()}.zip`);
}