export default function ResearchSection() {
  return (
    <section className="page-section" id="research">
      <div className="section-head reveal">
        <div className="section-eyebrow">
          <span className="num">03</span> Research
        </div>
        <h2 className="section-title">
          Things I&apos;m <span className="script">studying</span>
        </h2>
        <p className="section-sub">
          My research sits at the seam of systems and machine learning:
          how we build, serve, and evaluate models at scale.
        </p>
      </div>
<div className="areas-grid">
  <div className="area-card reveal">
    <div className="icon">A</div>
    <h4>Agentic AI Systems</h4>
    <p>
      Designing and developing intelligent agentic systems using LangChain,
      LangGraph, and MCP, focusing on multi-step reasoning, tool integration,
      and autonomous decision-making workflows.
    </p>
  </div>

  <div className="area-card reveal d1">
    <div className="icon">N</div>
    <h4>Natural Language Processing</h4>
    <p>
      Building NLP-powered applications with emphasis on text generation,
      retrieval-augmented systems, and efficient processing of real-world
      textual data across diverse domains.
    </p>
  </div>

  <div className="area-card reveal d2">
    <div className="icon">M</div>
    <h4>MLOps & Data Pipelines</h4>
    <p>
      Developing and maintaining robust pipelines for text data generation,
      preprocessing, and deployment, ensuring scalability, reliability,
      and continuous integration of machine learning systems.
    </p>
  </div>
</div>

      <div className="pubs-title">- Selected Publications -</div>

      <div className="pub-list">
        <article className="pub reveal">
          <div className="pub-year">2025</div>
          <div>
            <div className="pub-venue">
              <span className="star">*</span> Journal Paper
            </div>
            <h4 className="pub-name">
              <a href="#">DAM-Net: Dual Attention Multi-task Framework for Coronary Artery Segmentation and
                Stenosis Severity Classification</a>
            </h4>
            <p className="pub-authors">
              <span className="self">Abdul Jalil Tamjid</span>, Mohammad Motiur Rahman, Sadia Tasnim
            </p>
            <div className="pub-links">
              <a href="#">PDF</a>
              <a href="#">arXiv</a>
              <a href="#">Code</a>
              <a href="#">BibTeX</a>
            </div>
          </div>
        </article>

        <article className="pub reveal">
          <div className="pub-year">2025</div>
          <div>
            <div className="pub-venue">ICCIT Conference Paper</div>
            <h4 className="pub-name">
              <a href="#">Performance Comparison of Spatial Filters for Denoising Rayleigh, Rician, and Gamma Noise Models in Ultrasound Images</a>
            </h4>
            <p className="pub-authors">
              <span className="self">Monir Hossain</span>, Abdul Jalil Tamjid, Mohammad Motiur Rahman ...
            </p>
            <div className="pub-links">
              <a href="https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=Performance+Comparison+of+Spatial+Filters+for+Denoising+Rayleigh%2C+Rician%2C+and+Gamma+Noise+Models+in+Ultrasound+Images&btnG=">Link</a>
              <a href="https://www.researchgate.net/profile/Abdul-Tamjid">arXiv</a>
              <a href="https://doi.org/10.1109/ICCIT68739.2025.11491192">DOI</a>
            
            </div>
          </div>
        </article>

        <article className="pub reveal">
          <div className="pub-year">2026</div>
          <div>
            <div className="pub-venue">ICEFront Conference Paper</div>
            <h4 className="pub-name">
              <a href="#">A Note on Calibration Drift in Long-Lived Production Models</a>
            </h4>
            <p className="pub-authors">
              <span className="self">Abdul Jalil Tamjid</span>, Tresha Rani Robi Das, Abdur Rakib ...
            </p>
            <div className="pub-links">
              <a href="#">PDF</a>
              <a href="#">Dataset</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
