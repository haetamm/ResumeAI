interface FormData {
  [key: string]: any;
}

export const downloadWordDocument = async (
  formData: FormData,
  path: string,
  handleError: (error: any) => void
): Promise<void> => {
  try {
    const res = await fetch('/api/generate-word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        qrCodeUrl: path,
      }),
    });

    if (!res.ok) throw new Error('Gagal menghasilkan dokumen Word');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.docx';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    handleError(error);
  }
};