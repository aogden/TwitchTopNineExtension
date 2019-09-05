

//Wraps the twitch extension for better handling by vue components
export class TwitchWrapper {
  private _twitchExt?:TwitchExt;

  public configure(window:Window) {
    this._twitchExt = window.Twitch.ext;

    this._twitchExt.onAuthorized(auth => {
      console.log(`auth complete token ${auth.token} user ${auth.userId}`, auth);
    });
  }

}

export const Twitch = new TwitchWrapper();
