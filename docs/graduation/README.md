# Zaytoun Graduation Report

This folder contains the complete graduation project report for **Zaytoun**, submitted to the Department of Computer Information Systems at the Hashemite University.

## File Order

The files are numbered in the exact order they should appear in the final bound report.

| # | File | Section |
|---|---|---|
| 00 | 00-Cover-Page.md | Cover page |
| 01 | 01-Acknowledgement.md | Acknowledgement |
| 02 | 02-Undertaking.md | Undertaking declaration |
| 03 | 03-Certificate.md | Supervisor certificate |
| 04 | 04-Abstract.md | Abstract |
| 05 | 05-Table-of-Contents.md | Table of Contents, List of Tables, List of Figures |
| 06 | 06-Chapter1-Introduction.md | Chapter 1. Introduction |
| 07 | 07-Chapter2-Related-Systems.md | Chapter 2. Related Existing Systems |
| 08 | 08-Chapter3-Analysis-Design.md | Chapter 3. Analysis and Design |
| 09 | 09-Chapter4-Implementation.md | Chapter 4. Implementation |
| 10 | 10-Chapter5-Testing-Evaluation.md | Chapter 5. Testing and Evaluation |
| 11 | 11-Chapter6-Conclusion.md | Chapter 6. Conclusion and Future Work |
| 12 | 12-References.md | References |
| 13 | 13-Appendices.md | Appendices A, B, C, D |

## How to Convert to Word or PDF

The report is written in Markdown so it can be edited freely. To convert to Word for the final submission:

1. Open each file in Microsoft Word using **File, Open, All files** and select the `.md` file. Word will render the formatting.
2. Or use Pandoc on the command line:
   ```
   pandoc 00-Cover-Page.md 01-Acknowledgement.md 02-Undertaking.md 03-Certificate.md 04-Abstract.md 05-Table-of-Contents.md 06-Chapter1-Introduction.md 07-Chapter2-Related-Systems.md 08-Chapter3-Analysis-Design.md 09-Chapter4-Implementation.md 10-Chapter5-Testing-Evaluation.md 11-Chapter6-Conclusion.md 12-References.md 13-Appendices.md -o Zaytoun-Graduation-Report.docx
   ```
3. Or convert to PDF:
   ```
   pandoc *.md -o Zaytoun-Graduation-Report.pdf --pdf-engine=xelatex
   ```

## Placeholders to Fill In

Before printing, replace the following placeholders that appear in the front matter:

- `[Insert Student ID]`
- `[Insert Supervisor Name and Title]`
- `[Insert Member Name]` (three examination committee members)
- `[Insert Chair Name]`

## Items the Student Still Needs to Add

The textual content of all six chapters is complete. The following non textual items are referenced from the report and should be added separately before the final submission:

1. **Use case diagram (Figure 3.1).** Can be drawn in draw.io, Lucidchart, or PlantUML using the use case list in section 3.4.
2. **System architecture diagram (Figure 3.2).** Boxes for the React app, TanStack Query, Spoonacular, YouTube, local storage, and the service worker.
3. **Data flow diagram for a recipe search (Figure 3.3).** Shows the user, the smart search, the Fuse indices, TanStack Query, and the merge layer.
4. **Use case detail diagrams (Figures 3.4 and 4.x).** Optional. Each major use case can have its own sequence or activity diagram.
5. **Screenshots (Appendix B).** Capture the listed screenshots from the live site on a desktop and a mobile device.
6. **Lighthouse audit screenshot (Figure 5.1).** Run Lighthouse against the production URL and save the report.

## Style Rules Enforced

- No em-dashes anywhere in the report.
- No emojis anywhere in the report.
- No advertising or tracking discussion outside Chapter 2 and Chapter 4.
- Arabic is referenced as "Arabic" with full RTL support; specific Arabic dish names are written in Latin transliteration in the body text (mansaf, mlukhiyeh, maqluba, koshary).

## Source Project

| Item | Value |
|---|---|
| Project root | `C:\Users\ViVoBooK\Desktop\recipe-app` |
| Production URL | https://zaytoun.online |
| Stack | React 19, TypeScript, Vite, Tailwind, TanStack Query, Fuse.js, jsPDF, vite-plugin-pwa |
| Hosting | Vercel |
| Domain | Spaceship (zaytoun.online) |
| External API | Spoonacular |
