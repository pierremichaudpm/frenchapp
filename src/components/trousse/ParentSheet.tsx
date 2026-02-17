import { useAudio } from '../../hooks/useAudio';
import type { ParentSheetData } from '../../types';

interface Props {
  data: ParentSheetData;
}

export default function ParentSheet({ data }: Props) {
  const { speak } = useAudio();

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('CARI Francisation', 20, 20);
    doc.setFontSize(16);
    doc.text(data.title, 20, 35);

    doc.setFontSize(14);
    doc.text('Vocabulaire:', 20, 55);
    data.words.forEach((w, i) => {
      doc.setFontSize(12);
      doc.text(`${w.emoji}  ${w.french}`, 25, 65 + i * 8);
    });

    const yStart = 70 + data.words.length * 8;
    doc.setFontSize(14);
    doc.text('Activités à la maison:', 20, yStart);
    data.activities.forEach((a, i) => {
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(`${i + 1}. ${a}`, 170);
      doc.text(lines, 25, yStart + 10 + i * 15);
    });

    doc.save('cari-vocabulaire.pdf');
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-dark font-serif mb-4">{data.title}</h2>

      {/* Words */}
      <div className="bg-white rounded-2xl border border-brume p-4 mb-4">
        <h3 className="font-bold text-dark mb-3">Vocabulaire</h3>
        <div className="grid grid-cols-2 gap-2">
          {data.words.map(w => (
            <button
              key={w.french}
              onClick={() => speak(w.french)}
              className="flex items-center gap-2 p-3 bg-light rounded-xl
                hover:bg-secondary/10 active:scale-95 transition-all text-left"
            >
              <span className="text-2xl">{w.emoji}</span>
              <span className="font-medium text-dark text-sm">{w.french}</span>
              <span className="text-primary text-xs ml-auto">🔈</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white rounded-2xl border border-brume p-4 mb-6">
        <h3 className="font-bold text-dark mb-3">Activités à la maison</h3>
        <div className="space-y-3">
          {data.activities.map((activity, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-accent/20 text-dark text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-dark leading-relaxed">{activity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Download */}
      <button
        onClick={handleDownloadPDF}
        className="w-full py-3 bg-primary text-white rounded-xl font-medium
          active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
      >
        📄 Télécharger le PDF
      </button>
    </div>
  );
}
