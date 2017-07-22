---
layout: post
title: "U盾的原理和实现"
date: 2017-07-22 16:51:40 +800
categories: 
by: gf
description: 实现一个「软U盾」
---

U盾是一个咋看起来很神奇的东西，后来有了软件版，比如 QQ 邮箱有微信密令，Google 也有 [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DiOS&oco=0)。今天 Google 了实现原理，并且实现了一个简单版本。

核心是 Hmac，服务器颁发给客户端一个 key（字符串）。服务器和客户端都知道这个字符串，并且服务器保存这个 key 颁发给哪个设备（用户）了。验证的时候，服务器和客户端同时用相同的算法 hash 某个相同的东西，然后客户端把这个 hash 发给服务器，因为 key、算法、加密内容都相同，所以服务器很好验证。

那么加密哪个内容呢？当然是**时间**。所以必须保证服务器和客户端的时间是相同的，离线版的硬件的话，依靠时钟；在线版的软件客户端可以定时去同步服务器端的时间（知道 diff 就可以了）。

如何保证密码的有效时间？因为输入的时候肯定是有时间差的，如果很快就过期了，那无论如何也输入不对了。

时间可以按照分钟算，不要按照秒（因为秒太快了）。比如，加密内容是，现在距离 1970-01-01 过了多少分钟了。这样有效期就相对长了，足够用户输入了。


```java

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class OneTimePassword {
	private double timeDiff;
	private byte[] key;
	private final int ttl = 30;
	private final String algorithm = "HmacSHA1";
	private final int[] lengthBase = new int[] { 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000 };
	private Mac mac;

	public OneTimePassword(double timeDiff, String key) {
		super();
		this.timeDiff = timeDiff;
		this.key = hexStringToBytes(key);
		// 初始化 hmac 算法
		try {
			SecretKeySpec signingKey = new SecretKeySpec(this.key, this.algorithm);
			this.mac = Mac.getInstance(this.algorithm);
			mac.init(signingKey);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public OneTimePassword(String key) {
		this(0, key);
	}

	private byte[] longToBytes(long l) {
		byte[] result = new byte[8];
		for (int i = 7; i >= 0; i--) {
			result[i] = (byte) (l & 0xFF);
			l >>= 8;
		}
		return result;
	}

	public byte[] hexStringToBytes(String hexString) {
		if (hexString == null || hexString.equals("")) {
			return null;
		}
		hexString = hexString.toUpperCase();
		int length = hexString.length() / 2;
		char[] hexChars = hexString.toCharArray();
		byte[] d = new byte[length];
		for (int i = 0; i < length; i++) {
			int pos = i * 2;
			d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));
		}
		return d;
	}

	private byte charToByte(char c) {
		return (byte) "0123456789ABCDEF".indexOf(c);
	}

	private byte[] count() {
		long count = (long) ((System.currentTimeMillis() + this.timeDiff) / (this.ttl * 1000));
		return longToBytes(count);
	}

	public String password(int passwordLength) {
		if (passwordLength > lengthBase.length)
			passwordLength = lengthBase.length - 1;
		if (passwordLength < 0)
			passwordLength = 0;
		byte[] result = mac.doFinal(this.count());

		int offset = result[result.length - 1] & 0xf;
		long value = ((result[offset] & 0x7f) << 24) | ((result[offset + 1] & 0xff) << 16)
				| ((result[offset + 2] & 0xff) << 8) | (result[offset + 3] & 0xff);

		return String.valueOf(value % lengthBase[passwordLength]);
	}

	public String password() {
		return password(6);
	}

	public static void main(String[] args) {
		OneTimePassword otp = new OneTimePassword("e959af1d9a80782d1dc2fce35968dca0d7d130cd");
		System.out.println(otp.password());
	}

}

```

