const musicAll = [
	{
		id: 'music-0',
		name: 'Nơi tình yêu bắt đầu',
		artist: 'Bằng Kiều và Lam Anh',
		image: './img/noitinhyeustart.jpg',
		link: './music/Nơi Tình Yêu Bắt Đầu.mp3',
	},
	{
		id: 'music-1',
		name: 'Nơi Tình Yêu Kết Thúc',
		artist: 'Bùi Anh Tuấn',
		image: './img/buianhtuan.jpg',
		link: './music/Nơi Tình Yêu Kết Thúc.mp3',
	},
	{
		id: 'music-2',
		name: 'Dấu Mưa',
		artist: 'VŨ CÁT TƯỜNG',
		image: './img/vucattuong.jpg',
		link: './music/Vết Mưa.mp3',
	},
    {
		id: 'music-3',
		name: 'THƯƠNG EM LÀ ĐIỀU ANH KHÔNG THỂ NGỜ',
		artist: 'Noo Phước Thịnh',
		image: './img/noophuocthinh.jpg',
		link: './music/Thương Em Là Điều Anh Không Thể Ngờ.mp3',
	},
	{
		id: 'music-4',
		name: 'CHƯA QUÊN NGƯỜI YÊU CŨ',
		artist: 'HÀ NHI X HỨA KIM TUYỀN',
		image: './img/chuaquennguoicu.jpg',
		link: './music/CHƯA QUÊN NGƯỜI YÊU CŨ.mp3',
	},
	{
		id: 'music-5',
		name: 'Thuận Theo Ý Trời',
		artist: 'Bùi Anh Tuấn',
		image: './img/thuantheoytroi.jpg',
		link: './music/Thuận Theo Ý Trời.mp3',
	},
    {
		id: 'music-6',
		name: 'Chạm Khẽ Tim Anh Một Chút Thôi',
		artist: 'Noo Phước Thịnh',
		image: './img/chamkhetimanh.jpg',
		link: './music/Chạm Khẽ Tim Anh Một Chút Thôi.mp3',
	},
	{
		id: 'music-7',
		name: 'Năm ấy',
		artist: 'ĐỨC PHÚC',
		image: './img/namay.jpg',
		link: './music/NĂM ẤY.mp3',
	},
	{
		id: 'music-8',
		name: 'CHẠM ĐÁY NỖI ĐAU',
		artist: 'ERIK (ft. MR.SIRO)',
		image: './img/chamdaynoidau.jpg',
		link: './music/CHẠM ĐÁY NỖI ĐAU.mp3',
	},
    {
		id: 'music-9',
		name: 'Có tất cả nhưng thiếu em',
		artist: 'ERIK',
		image: './img/cotatcanhungthieuanh.jpg',
		link: './music/Có tất cả nhưng thiếu em.mp3',
	},
    {
		id: 'music-10',
		name: 'lời tạm biệt chưa nói',
		artist: 'GREY D, ORANGE, KAI ĐINH',
		image: './img/loitambietchuanoi.jpg',
		link: './music/loitambietchuanoi.mp3',
	},
];

const wrapper = document.querySelector('.wrapper');
const musicImage = wrapper.querySelector('.image-area img');
const musicName = wrapper.querySelector('.name');
const musicArtists = wrapper.querySelector('.artists');
const playPauseBtn = wrapper.querySelector('.play-pause');
const prevBtn = wrapper.querySelector('.btn-prev');
const nextBtn = wrapper.querySelector('.btn-next');
const mAudio = wrapper.querySelector('#m-audio');
const progressArea = wrapper.querySelector('.progress-area');
const progressBar = wrapper.querySelector('.progress-bar');
const start = wrapper.querySelector('.current-time');
const end = wrapper.querySelector('.max-duration');
const musicList = wrapper.querySelector('.music-list');
const closeMusicBtn = wrapper.querySelector('#close');
const ultag = wrapper.querySelector('ul');
const menulistBtn = wrapper.querySelector('#menu-list');

let musicIndex = 0;


for (let i = 0; i < musicAll.length; i++) {
	const item = musicAll[i];
	let litag = `<li class="music-item" li-index="${i}">
       <div class="row">
         <span>${item.name}</span>
         <p class="artists">${item.artist}</p>
       </div>

       <audio class="${item.id}" src="${item.link}" type="audio/mp3"></audio>

       <span id="${item.id}" class="timer audio-duration m-list">02:00</span>
     </li>`;
	ultag.insertAdjacentHTML('beforeend', litag);
	const liAudioDurationTag = ultag.querySelector(`#${item.id}`);
	const liAudioTag = ultag.querySelector(`.${item.id}`);
	liAudioTag.addEventListener('loadeddata', () => {
		const duration = liAudioTag.duration;
	
		const min = Math.floor(duration / 60);
		let sec = Math.floor(duration % 60);
		if (sec < 10) {
			sec = '0' + sec;
		}
		liAudioDurationTag.innerText = `${min}:${sec}`;
	});
}


const loadMusic = (currentMusic) => {
	musicImage.src = currentMusic.image;
	musicName.innerText = currentMusic.name;
	musicArtists.innerText = currentMusic.artist;
	mAudio.src = currentMusic.link;
};

function clicked(liIndex) {
	musicIndex = liIndex;
	const currentMusic = musicAll[liIndex];
	loadMusic(currentMusic);
    playingSong();
	playMusic();
}

const litags = wrapper.querySelectorAll('li');

function playingSong() {
	for (let i = 0; i < litags.length; i++) {
		const item = litags[i];

		if (item.classList.contains('playing')) {
			item.classList.remove('playing');
		}

		if (item.getAttribute('li-index') == musicIndex) {
			item.classList.add('playing');
		}

		item.addEventListener('click', () =>
			clicked(item.getAttribute('li-index'))
		);
	}
}

const playMusic = () => {
    playPauseBtn.classList.add('Paused')
	playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
	musicImage.classList.add('rotate');
	mAudio.play();
};

const pauseMusic = () => {
    playPauseBtn.classList.remove('Paused')
	playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
	musicImage.classList.remove('rotate');
	mAudio.pause();
};

nextBtn.addEventListener('click',() => {
 musicIndex ++;
 
if(musicIndex > musicAll.length - 1){
    musicIndex = 0;
}
const currentMusic = musicAll[musicIndex];
loadMusic(currentMusic);
playMusic();
playingSong();
})

prevBtn.addEventListener('click',() => {
    musicIndex --;
    
   if(musicIndex < 0){
       musicIndex = musicAll.length-1;
   }
   const currentMusic = musicAll[musicIndex];
   loadMusic(currentMusic);
   playMusic();
   playingSong();
})

progressArea.addEventListener('click', (e) => {
    const progressWidth = progressArea.clientWidth;
    const offsetX = e.offsetX;
    const songDuration = mAudio.duration;

    mAudio.currentTime = (offsetX / progressWidth) * songDuration;
    playMusic();
});

mAudio.onloadedmetadata = () => {
	progressBar.max = mAudio.duration;
	progressBar.value = mAudio.currentTime;

	setInterval(() => {
		let min = Math.floor(mAudio.duration / 60);
		let sec = Math.floor(mAudio.duration % 60);
		let curMin = Math.floor(mAudio.currentTime / 60);
		let curSec = Math.floor(mAudio.currentTime % 60);

		if (sec < 10) {
			sec = '0' + sec;
		}
		if (curSec < 10) {
			curSec = `0${curSec}`;
		}
		if (min < 10) {
			min = '0' + min;
		}
		if (curMin < 10) {
			curMin = `0${curMin}`;
		}

		const total_duration = `${min}:${sec}`;
		if (mAudio.duration) {
			end.innerHTML = `${total_duration}`;
		}
		start.innerHTML = `${curMin}:${curSec}`;
	}, 1000);
};

mAudio.addEventListener('timeupdate', (e) => {
	const currentTime = e.target.currentTime;
	const duration = e.target.duration;

	const progressWidth = (currentTime / duration) * 100;
	progressBar.style.width = `${progressWidth}%`;
});

playPauseBtn.addEventListener('click', () => {
	if(playPauseBtn.classList.contains('Paused')){
        pauseMusic();
    } else {
        playMusic();
    }
});
window.addEventListener('load', () => {
	const currentMusic = musicAll[musicIndex];
	loadMusic(currentMusic);
	playingSong();
});

menulistBtn.addEventListener('click', () => musicList.classList.toggle('show'));
closeMusicBtn.addEventListener('click', () =>
	musicList.classList.remove('show')
);
