// declare global variables
let vidyoConnector = null;
let startTooltip = document.getElementById('startTooltip');
let loadingPopUp = document.getElementById('loadingPopUp');
let roomInfoPopUp = document.getElementById('roomInfoPopUp');
let roomInfoBtn = roomInfoPopUp.querySelector('button');
let roomInfoText = roomInfoPopUp.querySelector('pre');
let meetingLink = document.getElementById('meetingLink');
let startBtn = document.getElementById('btnStart');
let name = document.getElementById('name');

function onVidyoClientLoaded() {
    window.VC = new window.VidyoClientLib.VidyoClient('', () => {
        init();
    });
}

async function init() {
    try {
        vidyoConnector = await VC.CreateVidyoConnector({
            viewId: "renderer", // Div ID where the composited video will be rendered, see VidyoConnector.html;
            viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
            remoteParticipants: 8,     // Maximum number of participants to render
            logFileFilter: "debug@VidyoClient debug@VidyoSDP debug@VidyoResourceManager",
            logFileName: "",
            userData: 0,
            constraints: {}
        });
        console.log("create success");
        startTooltip.classList.add('active')
    } catch (error) {
        console.error('creating failed', error);
    }
}

async function joinCall() {
    try {
        if (!name.checkValidity()) {
            return name.reportValidity();
        }
        startBtn.disabled = true;
        startTooltip.classList.remove('active');
        loadingPopUp.setAttribute('data-text', 'Creating a room...');
        // create new room
        let res = await fetch('https://vidyo-adhoc-zsdgxlqgkq-uc.a.run.app/api/v1/rooms', {method: 'POST'});
        res = await res.json();
        console.log(res);
        const params = res.roomUrl.split('/join/');
        const portal = params[0];
        const roomKey = params[1];

        const _joinCall = async () => {
            roomInfoPopUp.removeAttribute('data-show');
            loadingPopUp.setAttribute('data-text', 'Joining a call...');
            await vidyoConnector.ConnectToRoomAsGuest({
                host: portal, // HOST
                roomKey: roomKey, //ROOM KEY
                displayName: name.value,
                roomPin: res.pin,
                onSuccess: () => {
                    console.log(`vidyoConnector.ConnectToRoomAsGuest : onSuccess callback received`);
                    meetingLink.textContent = res.roomUrl;
                    loadingPopUp.setAttribute('data-text', '');
                    document.body.classList.add('in-call');
                    startBtn.disabled = false;
                },
                onFailure: (reason) => {
                    console.error("vidyoConnector.Connect : onFailure callback received", reason);
                    handleDisconnect();
                },
                onDisconnected: (reason) => {
                    console.log("vidyoConnector.Connect : onDisconnected callback received", reason);
                    handleDisconnect();
                }
            });
        };

        roomInfoText.innerHTML = wrapLinks(res.inviteContent);
        roomInfoBtn.firstElementChild.innerHTML = 'Join';
        roomInfoBtn.onclick = () => _joinCall();
        roomInfoPopUp.setAttribute('data-show', true);

    } catch(error) {
        console.log(error);
        handleDisconnect();
    };
}

function endCall() {
    vidyoConnector.Disconnect();
}

function handleDisconnect() {
    loadingPopUp.setAttribute('data-text', '');
    document.body.classList.remove('in-call');
    meetingLink.textContent = '';
    startBtn.disabled = false;
}

function roomInfoClick() {
    roomInfoBtn.firstElementChild.innerHTML = 'Close';
    roomInfoBtn.onclick = () => roomInfoPopUp.removeAttribute('data-show');
    roomInfoPopUp.setAttribute('data-show', true);
}

function copyToClipboard() {
    navigator.clipboard.writeText(meetingLink.textContent);
}

function wrapLinks(text) {
    return text.replace(/(?:(https?\:\/\/[^\s]+))/gm, '<a href="$1" target="_blank">$1</a>')
}
