export default function MobileBar() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <div class="mobile-bar">
            <div class="mobile-brand">
              <div class="mobile-avatar">
                        <img 
    src="/Abdul_Jalil_Tamjid.jpg" 
    alt="Abdul Jalil Tamjid" 
    style="width:100%; height:100%; object-fit:cover; border-radius:50%;"
  />
              </div>
              <span>Abdul Jalil Tamjid</span>
            </div>
            <button class="menu-btn" id="openMenu" aria-label="Open menu"><i class="fas fa-bars"></i></button>
          </div>
        `,
      }}
    />
  );
}
