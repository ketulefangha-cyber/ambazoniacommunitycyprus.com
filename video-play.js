document.querySelectorAll(".video-wrapper").forEach(wrapper => {
    wrapper.addEventListener("click", () => {
        const videoId = wrapper.dataset.videoId;

        wrapper.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                loading="lazy"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                style="width:100%; height:100%;">
            </iframe>
        `;
    });
});
