export default function HeroSection() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <section class="hero" id="home">
            <div class="hero-text">
         <h1>
  Hi, I'm <span class="accent">Abdul Jalil</span><br>
  AI Engineer<br>
  & Researcher
</h1>
              <p class="hero-sub reveal in d2">
                 I'm a Software Engineer with <strong>1+ year</strong> of experience in AI and Machine Learning, focusing on building scalable intelligent systems and conducting research on data-driven methodologies and model performance.
</p>
              </p>
              <div class="cta-row reveal in d3">
                <a href="#contact" class="btn btn-primary">Got a project?</a>
                <a href="#contact" class="btn btn-ghost">Let's talk</a>
                <span class="dot-deco" aria-hidden="true"></span>
              </div>
              <div class="contact-info reveal in d4">
                <p><i class="fas fa-phone"></i>+880 1700 000 000</p>
                <p><a href="mailto:ajtamjid@gmail.com"><i class="fas fa-envelope"></i>ajtamjid@gmail.com</a></p>
                <p><i class="fas fa-location-dot"></i>Nikunjo-2, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div class="hero-visual reveal in d2">
              <div class="visual-wrap">
                <div class="shape">
                  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <clipPath id="topHalf"><rect x="0" y="0" width="400" height="200"/></clipPath>
                      <clipPath id="bottomHalf"><rect x="0" y="200" width="400" height="200"/></clipPath>
                    </defs>
                    <circle cx="200" cy="200" r="180" fill="#8B7BFF" clip-path="url(#topHalf)" transform="translate(-14 0)"/>
                    <circle cx="200" cy="200" r="180" fill="#8B7BFF" clip-path="url(#bottomHalf)" transform="translate(14 0)"/>
                  </svg>
                </div>
                <div class="portrait">
  <img 
  src="/jalil.jpg"
    alt="Abdul Jalil Tamjid" 
    style="width:100%; height:100%; object-fit:cover; border-radius:50%;"
  />
</div>
                <span class="deco deco-1">✦</span>
                <span class="deco deco-2">✦</span>
                <span class="deco deco-3">✦</span>
                <span class="deco deco-4">✦</span>
                <svg class="swoosh" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20 Q40 5 65 25 Q70 28 65 35" stroke="#0E1849" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <path d="M58 30 L65 35 L60 42" stroke="#0E1849" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </section>
        `,
      }}
    />
  );
}
