import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMvmntPage(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MVMNT | Move with Purpose</title>
  <style>
    :root {
      --ink: #17222f;
      --sky: #edf6ff;
      --sun: #ffba59;
      --citrus: #f05d2f;
      --sea: #134074;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 2rem 1rem;
      color: var(--ink);
      font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
      background:
        radial-gradient(circle at 8% 15%, rgba(240, 93, 47, 0.16), transparent 30%),
        radial-gradient(circle at 90% 8%, rgba(19, 64, 116, 0.16), transparent 35%),
        linear-gradient(145deg, #fffaf0 0%, var(--sky) 48%, #ffffff 100%);
    }

    main {
      width: min(720px, 100%);
      border-radius: 20px;
      border: 1px solid rgba(23, 34, 47, 0.1);
      padding: 2.5rem 2rem;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 18px 36px rgba(19, 64, 116, 0.14);
      animation: reveal 500ms ease-out;
    }

    .tag {
      display: inline-block;
      border-radius: 999px;
      padding: 0.4rem 0.85rem;
      margin-bottom: 1.2rem;
      letter-spacing: 0.12em;
      font-size: 0.72rem;
      font-weight: 700;
      color: #3d2f0a;
      background: linear-gradient(120deg, var(--sun), #ffe5b5);
    }

    h1 {
      margin: 0;
      color: var(--sea);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: clamp(2.2rem, 6vw, 3.7rem);
      font-family: "Copperplate", "Trajan Pro", "Times New Roman", serif;
    }

    p {
      margin-top: 1.2rem;
      margin-bottom: 0;
      line-height: 1.65;
      font-size: 1.05rem;
      max-width: 60ch;
    }

    .link {
      margin-top: 2rem;
      display: inline-block;
      text-decoration: none;
      color: white;
      font-weight: 700;
      border-radius: 999px;
      padding: 0.85rem 1.5rem;
      background: linear-gradient(120deg, var(--citrus), #d94318);
      box-shadow: 0 8px 18px rgba(240, 93, 47, 0.35);
      transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .link:hover {
      transform: translateY(-2px);
      box-shadow: 0 11px 22px rgba(240, 93, 47, 0.4);
    }

    @keyframes reveal {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 640px) {
      main {
        padding: 2rem 1.25rem;
      }

      p {
        font-size: 1rem;
      }
    }
  </style>
</head>
<body>
  <main>
    <span class="tag">INTRODUCING</span>
    <h1>MVMNT</h1>
    <p>
      MVMNT is built for people and teams who care about forward momentum. The platform turns movement into progress,
      with experiences designed to keep wellness, community, and consistency connected.
    </p>
    <p>
      Explore the mission and products at mvmnts.com.
    </p>
    <a class="link" href="https://mvmnts.com" target="_blank" rel="noopener noreferrer">Visit mvmnts.com</a>
  </main>
</body>
</html>`;
  }
}
