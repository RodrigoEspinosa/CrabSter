function getGravatar ( email, size ) {
	var gravatarURL, gravatarHash, gravatarSize;
	gravatarURL  = "http://www.gravatar.com/avatar/";
	gravatarHash = hex_md5(email);
	gravatarSize = "?s="+size;
	return gravatarURL+gravatarHash+gravatarSize;
}