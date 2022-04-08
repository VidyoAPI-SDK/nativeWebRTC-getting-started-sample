// declare global variables
let vidyoConnector = null;
let meetingLink = document.getElementById('meetingLink');
let pin = document.getElementById('pin');
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
    } catch (error) {
        console.error('creating failed', error);
    }
}

async function joinCall() {
    try {
        // create new room
        let res = await fetch('https://vidyo-adhoc-zsdgxlqgkq-uc.a.run.app/api/v1/rooms', {method: 'POST'});
        res = await res.json();
        console.log(res);
        const params = res.roomUrl.split('/join/');
        const portal = params[0];
        const roomKey = params[1];
        await vidyoConnector.ConnectToRoomAsGuest({
            host: portal, // HOST
            roomKey: roomKey, //ROOM KEY
            displayName: name.value,
            roomPin: res.pin,
            onSuccess: () => {
                console.log(`vidyoConnector.ConnectToRoomAsGuest : onSuccess callback received`);
                meetingLink.value = res.roomUrl;
                pin.value = res.pin;
            },
            onFailure: (reason) => {
                console.error("vidyoConnector.Connect : onFailure callback received", reason);
            },
            onDisconnected: (reason) => {
                console.log("vidyoConnector.Connect : onDisconnected callback received", reason);
            }
        });
    } catch(error) {
        console.log(error)
    };
}

function endCall() {
    vidyoConnector.Disconnect();
    meetingLink.value = '';
    pin.value = '';
}