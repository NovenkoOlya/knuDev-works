let photosContainer = document.querySelector(".photo-images")
let btnCategoryAll = document.getElementById("category-all")
let btnCategoryAbstract = document.getElementById("category-abstract")
let btnCategoryNature = document.getElementById("category-nature")
let btnCategoryPortraits = document.getElementById("category-portraits")

let photos = [
    {src: './assets/images/portraits-01.png', alt: 'Portrait', info: 'Подобаюсь собі тут', date: '13 March 2025'},
    {src: './assets/images/adbstract-01.png', alt: 'Abstract', info: 'Created by designer', date: '24 February 2025'},
    {src:  './assets/images/nature-01.png', alt: 'Nature', info: 'I took this photo last autumn', date: '24 February 2025'},
    {src:  './assets/images/portraits-02.png', alt: 'Portrait', info: 'Photo of my client', date: '21 February 2025'},
    {src:  './assets/images/adbstract-02.png', alt: 'Abstract', info: 'Created by designer', date: '11 February 2025'},
    {src:  './assets/images/nature-02.png', alt: 'Nature', info: 'Beautiful photo', date: '2 February 2025'},
    {src:  './assets/images/portraits-03.png', alt: 'Portrait', info: 'Photo of my client', date: '1 January 2025'},
    {src:  './assets/images/nature-03.png', alt: 'Nature', info: 'Photo of nature', date: '3 December 2024'},
    {src:  './assets/images/portraits-04.png', alt: 'Portrait', info: 'Photo of my new client', date: '2 December 2024'}
]

const outputPhoto = (photo) => {
    return `
    <div class="photo" data-src="${photo.src}" data-alt="${photo.alt}" data-info="${photo.info}" data-date="${photo.date}">
        <img class="img-range" src="${photo.src}" alt="${photo.alt}">
    </div>
    `
}

const outputPhotoInfo = (photo) => {
    return `
        <div class="photo-information" data-src="${photo.src}" data-alt="${photo.alt}" data-info="${photo.info}" data-date="${photo.date}">
            <img src="${photo.src}" alt="${photo.alt}">
            <div class="photo-info">
                <button class="close-btn">X</button>
                <p class="photo-text">${photo.info}</p>
                <p class="photo-date">${photo.date}</p>
            </div>
        </div>
    `
}

const filterByAlt = (filterText) => {
    return photos.filter(photo => photo.alt.toLowerCase() === filterText.toLowerCase())
}

const displayPhotos = (filteredPhotos) => {
    photosContainer.innerHTML = filteredPhotos.map(photo => outputPhoto(photo)).join('')
}

const closePhotos = () => {
    document.querySelectorAll(".photo-information").forEach(photoInfo => {
        photoInfo.classList.remove("active")
        photoInfo.remove()
    })
    document.querySelector(".photo-images").classList.remove("active")
}

photosContainer.addEventListener("click", (event) => {
    let photo = event.target.closest(".photo")
    if (photo) {
        document.querySelectorAll(".photo").forEach(p => p.classList.remove("active"))
        photo.classList.add("active")

        const photoInfo = outputPhotoInfo({
            src: photo.dataset.src,
            alt: photo.dataset.alt,
            info: photo.dataset.info,
            date: photo.dataset.date
        })

        photo.insertAdjacentHTML("beforeend", photoInfo)
        document.querySelector(".photo-images").classList.add("active")
    } else {
        closePhotos()
    }
})

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-btn")) {
        closePhotos()
    }
})

document.addEventListener("DOMContentLoaded", () => {
    displayPhotos(photos)
})

btnCategoryAll.addEventListener("click", () => {
    displayPhotos(photos)
})

btnCategoryAbstract.addEventListener("click", () => {
    const filteredPhoto = filterByAlt('Abstract')
    displayPhotos(filteredPhoto)
})

btnCategoryNature.addEventListener("click", () => {
    const filteredPhoto = filterByAlt('Nature')
    displayPhotos(filteredPhoto)
})

btnCategoryPortraits.addEventListener("click", () => {
    const filteredPhoto = filterByAlt('Portrait')
    displayPhotos(filteredPhoto)
})

document.addEventListener("DOMContentLoaded", () => {
    const firstCategory = document.querySelector('.category:nth-child(2)')
    if (firstCategory) {
        firstCategory.classList.add('active')
    }
    
    document.querySelectorAll('.category').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category').forEach(category => {
                category.classList.remove('active')
            })
            item.classList.add('active')
        })
    })
})
