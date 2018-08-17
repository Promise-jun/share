var playing = false, 	//是否播放
	playlist = [],   	//播放列表
	currentIndex = -1,  //播放索引
	currentSong = {},   //正在播放的对象
	songReady = false,  //是否就绪
	currentTime = 0,    //播放时间
	touch = {};

var audio = document.getElementById('audio');
var playBtn = document.getElementById('playBtn');
var playNext = document.getElementById('playNext');
var progressBar = document.getElementById('progressBar');
var progress = document.getElementById('progress');
var progressBtn = document.getElementById('progressBtn');

//歌曲列表
$.ajax({
	url: './mock/list.json'
}).done(res => {
	playlist = res;
	//渲染列表
	appendList(playlist);
	//立即播放
	currentSong = playlist[0];
	//更新currentSong后播放
	newSongPlay(currentSong);
	//更新正在播放的内容
	updatePlayHtml(currentSong);
	scroll.refresh();
})

//点击播放或暂停
playBtn.onclick = function() {
	if (!songReady) {
      return
    }
	if (playing) {
		playing = false;
		audio.pause();
		this.className = 'play';
	} else {
		playing = true;
		audio.play();
		this.className = 'pause';
	}
}
//点击播放下一个
playNext.onclick = function() {
	next();
}
//点击播放上一个
playPrev.onclick = function() {
	if (currentIndex <= 0) {
		console.log('已经是第一个了哦！快去下载情说APP继续听吧！');
		return
	}
	songReady = false;
	disableCls(songReady);
	currentIndex--;
	//立即播放
	currentSong = playlist[currentIndex];
	//更新currentSong后播放
	newSongPlay(currentSong);
	//更新正在播放的内容
	updatePlayHtml(currentSong);
}
//点击播放列表
$(document).on('click', '#playListUl li', function() {
	var that = $(this)
	var index = playlist.findIndex((item) => {
		return item.id == that.attr('sid')
	});
	if (index === currentIndex) {
		return
	}
	songReady = false;
	disableCls(songReady);
	currentIndex = index;
	//立即播放
	currentSong = playlist[currentIndex];
	//更新currentSong后播放
	newSongPlay(currentSong);
	//更新正在播放的内容
	updatePlayHtml(currentSong);
})

function ready() {
	songReady = true;
	disableCls(songReady);
}

function next() {
	if (currentIndex >= playlist.length - 1) {
		console.log('已经是最后一个了哦！快去下载情说APP继续听吧！');
		return
	}
	songReady = false;
	disableCls(songReady);
	currentIndex++;
	//立即播放
	currentSong = playlist[currentIndex];
	//更新currentSong后播放
	newSongPlay(currentSong);
	//更新正在播放的内容
	updatePlayHtml(currentSong);
}

function end() {
	next();
}

function error() {
	songReady = true;
	disableCls(songReady);
	console.log('音频加载时出错')
}

function newSongPlay(currentSong) {
	if (!currentSong.url) {
		return
	}
	audio.src = currentSong.url;
	audio.play();
	playing = true;
	playBtn.className = 'pause';
	currentIndex = playlist.findIndex((item) => {
		return item === currentSong
	});
	currentTime = 0;
}

function disableCls(songReady) {
	if (songReady) {
		$('#playPrev, #playBtn, #playNext').removeClass('disable');
	} else {
		$('#playPrev, #playBtn, #playNext').addClass('disable');
	}
}

function updatePlayHtml(currentSong) {
	$('.play_pic').attr('src', currentSong.image);
	$('.play_name').text(currentSong.name);
	$('.play_author').text(currentSong.singer);
	$('.total_time').text(format(currentSong.duration));

	progress.style.width = 0;
	progressBtn.style.left = 0;
}

function appendList(list) {
	var divs = '';
	$.each(list, (index, item) => {
		divs += '<li sid="' + item.id + '"><img src="' + item.image + '">';
		divs += '<div class="list"><p class="name">' + item.name + '</p>';
		divs += '<p class="data"><span>播放量:' + item.playNum + '次</span>';
		divs += '<span>评分:<i>' + item.grade.toFixed(1) + '</i></span></p>';
		divs += '<p class="author">' + item.singer + '</p></div></li>';
	})
	$('.program_list ul').append(divs);
}

//更新播放时间
function updateTime() {
	currentTime = audio.currentTime;
	$('.start_time').text(format(currentTime));
	var newPercent = currentTime / currentSong.duration;
	if (newPercent >= 0 && !touch.initiated) {
      	var barWidth = progressBar.clientWidth - 20
      	var offsetWidth = newPercent * barWidth
      	_offset(offsetWidth)
    }
}
function format(interval) {
    interval = interval | 0 //向下取整
    var minute = _pad(interval / 60 | 0)
    var second = _pad(interval % 60)
    return minute + ':' + second
}
function _pad(num, n=2) {
	var len = num.toString().length
	while (len < n) {
	  num = '0' + num
	  len++
	}
	return num
}

//点击改变播放进度
progressBar.onclick = function(e) {
	var rect = this.getBoundingClientRect();
	var offsetWidth = e.pageX - rect.left;
	_offset(offsetWidth);
	_triggerPercent()
}
//滑动改变播放进度
progressBtn.ontouchstart = function(e) {
	touch.initiated = true
    touch.startX = e.touches[0].pageX
    touch.left = progress.clientWidth
}
progressBtn.ontouchmove = function(e) {
	if (!touch.initiated) {
    	return
    }
    var deltaX = e.touches[0].pageX - touch.startX
    var offsetWidth = Math.min(progressBar.clientWidth - 20, Math.max(0, touch.left + deltaX))
    _offset(offsetWidth)
}
progressBtn.ontouchend = function(e) {
	touch.initiated = false
    _triggerPercent()
}

function _offset(offsetWidth) {
    progress.style.width = offsetWidth + 'px'
    progressBtn.style.left = offsetWidth + 'px'
}
function _triggerPercent() {
	var barWidth = progressBar.clientWidth - 20
    var percent = progress.clientWidth / barWidth
   	var newTime = currentSong.duration * percent
    audio.currentTime = newTime
    if (!playing) {
     	playing = true;
		audio.play();
		playBtn.className = 'pause';
    }
}