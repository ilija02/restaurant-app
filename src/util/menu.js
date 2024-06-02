import { jsPDF } from "jspdf";
import { dishes } from "@/data/dishes.js";

const downloadMenu = async () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Menu", 14, 22);

  let yPosition = 30;
  dishes.forEach((dish, index) => {
    if (index > 0 && index % 20 === 0) {
      doc.addPage();
      yPosition = 30;
    }
    doc.setFontSize(12);
    doc.text(`${dish.name} - $${dish.price}`, 14, yPosition);
    yPosition += 10;
  });

  doc.save("menu.pdf");
};

export default downloadMenu;
