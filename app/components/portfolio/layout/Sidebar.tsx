export default function Sidebar() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <aside class="sidebar">
            <div class="brand">
              <div class="avatar">
                <img 
    src="/Abdul_Jalil_Tamjid.jpg" 
    alt="Abdul Jalil Tamjid" 
    style="width:100%; height:100%; object-fit:cover; border-radius:50%;"
  />
              </div>
              <div class="brand-name">Abdul Jalil Tamjid</div>
              <div class="brand-role">AI Engineer · Researcher</div>
            </div>

            <nav class="nav">
              <a href="#home" class="active">Home</a>
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#research">Research</a>
              <a href="#projects">Projects</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </nav>

            <div class="socials">
              <a href="https://github.com/Abdul-Jalil26" aria-label="GitHub"><i class="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/abdul-jalil-tamjid-25a6671a5" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
             <a href="https://abduljalil.great-site.net/?i=1" aria-label="Website">
  <i class="fas fa-globe"></i>
</a>
              <a href="https://scholar.google.com/citations?hl=en&user=0yhU-moAAAAJ&view_op=list_works&gmla=AIqSsVtsTtXJiEaQ_5AeyVhwhEfO68JXqc_NBUxpeyxAQIzgS3ol1lkcaeElRx9zIDuwpnrEBDUdhDXxoaaOIjZonEbkZc6loHCxYyRv_R4S4nI7pkahGWvSD6iq21HpiQ" aria-label="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
            </div>

            <div class="copyright">
              Copyright © 2026 Abdul Jalil Tamjid<br>
              .All rights reserved.
            </div>
          </aside>
        `,
      }}
    />
  );
}
