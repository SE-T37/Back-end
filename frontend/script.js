document.addEventListener('DOMContentLoaded', () => {
    const page1Btn = document.getElementById('slide-item-1');
    const page2Btn = document.getElementById('slide-item-2');
    const page3Btn = document.getElementById('btn-page-3');
    const page4Btn = document.getElementById('btn-page-4');
  
    const pages = [
      document.getElementById('page-1'),
      document.getElementById('page-2'),
      document.getElementById('page-3'),
      document.getElementById('page-4')
    ];
  
    page1Btn.addEventListener('click', () => {
      showPage(0);
    });
    page2Btn.addEventListener('click', () => {
      showPage(1);
    });
    page3Btn.addEventListener('click', () => {
      showPage(2);
    });
    page4Btn.addEventListener('click', () => {
      showPage(3);
    });
  
    function showPage(index) {
        // Hide all pages
        pages.forEach((page) => {
          page.style.display = 'none';
        });
      
        // Show the selected page
        pages[index].style.display = 'block';
      };
});