"""Builds public/docs/faculty_awards_2025_2026.pdf from the 'Faculty awards 2025–2026' table in src/data/pages/university.ts.
Run after editing that table:  python scripts/make-awards-pdf.py"""
import json, re
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

src = open("src/data/pages/university.ts", encoding="utf-8").read()
block = src[src.index('title: "Faculty awards 2025–2026"'):]
block = block[block.index("rows: [") : block.index("\n        ],")]
rows = [json.loads(m) for m in re.findall(r"^\s+(\[.*\]),?$", block, flags=re.M)]

ss = getSampleStyleSheet()
RED = colors.HexColor("#7b1b1b")
cell = ParagraphStyle("c", parent=ss["BodyText"], fontSize=9, leading=12)
head = ParagraphStyle("h", parent=cell, fontName="Helvetica-Bold", textColor=colors.white)
title = ParagraphStyle("t", parent=ss["Title"], fontSize=18, alignment=0, textColor=RED, spaceAfter=2)
sub = ParagraphStyle("s", parent=cell, textColor=colors.HexColor("#555555"), spaceAfter=10)

data = [[Paragraph(h, head) for h in ["Sl. No.", "Faculty", "Award", "Awarding body", "Date"]]]
for i, r in enumerate(rows, 1):
    data.append([Paragraph(str(i), cell)] + [Paragraph(escape(c), cell) for c in r])

t = Table(data, colWidths=[16 * mm, 55 * mm, 100 * mm, 65 * mm, 24 * mm], repeatRows=1)
t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), RED),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#d9c9bb")),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#fff6ee")]),
    ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
]))
out = "public/docs/faculty_awards_2025_2026.pdf"
SimpleDocTemplate(out, pagesize=landscape(A4), leftMargin=14 * mm, rightMargin=14 * mm, topMargin=14 * mm, bottomMargin=14 * mm,
                  title="CDSIMER Faculty Awards 2025-2026", author="CDSIMER").build([
    Paragraph("Dr. Chandramma Dayananda Sagar Institute of Medical Education &amp; Research", title),
    Paragraph(f"Faculty awards and achievements, 2025-2026 ({len(rows)} entries)", sub), t])
print(out, len(rows))
