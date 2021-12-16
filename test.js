require("dotenv").config();

const axios = require("axios");
const moment = require("moment");

const fetch = require("node-fetch");

const users = require("./src/db/users");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const {
    liveCampaigns,
    campaignsToRun,
    campaignsDueToday,
    slackNotification,
} = require("./functions/utils/helpers");

// const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const res = {
    rawUrl: "https://mailshake-dashboard.netlify.app/.netlify/functions/emailResponse",
    rawQuery: "",
    path: "/.netlify/functions/emailResponse",
    httpMethod: "POST",
    headers: {
        accept: "*/*",
        "accept-encoding": "gzip",
        "client-ip": "100.64.0.176",
        connection: "keep-alive",
        "content-length": "15824",
        "content-type": "application/x-www-form-urlencoded",
        forwarded: "for=54.160.225.237;proto=https",
        host: "mailshake-dashboard.netlify.app",
        "user-agent": "Go-http-client/2.0",
        via: "http/1.1 Netlify[602e2173-792d-4076-9d6f-4f3d87f02294] (Netlify Edge Server)",
        "x-bb-ab": "0.659974",
        "x-bb-client-request-uuid": "01FQ2MBCT1ECV7N83VTHCVJXGV",
        "x-bb-ip": "54.160.225.237",
        "x-bb-loop": "1",
        "x-cdn-domain": "www.bitballoon.com",
        "x-country": "US",
        "x-datadog-parent-id": "4619288163414554505",
        "x-datadog-sampling-priority": "1",
        "x-datadog-trace-id": "9883548706603599490",
        "x-forwarded-for": "54.160.225.237, 100.64.0.176",
        "x-forwarded-proto": "https",
        "x-nf-cdn-host": "cdn-reg-aws-jfk-15",
        "x-nf-cdn-region": "jfk",
        "x-nf-client-connection-ip": "54.160.225.237",
        "x-nf-connection-proto": "https",
        "x-nf-forwarded-proto": "https",
        "x-nf-request-id": "01FQ2MBCT1ECV7N83VTHCVJXGV",
        "x-nf-request-start": "1639692219201385680",
    },
    multiValueHeaders: {
        Accept: ["*/*"],
        "Accept-Encoding": ["gzip"],
        "Client-Ip": ["100.64.0.176"],
        Connection: ["keep-alive"],
        "Content-Length": ["15824"],
        "Content-Type": ["application/x-www-form-urlencoded"],
        Forwarded: ["for=54.160.225.237;proto=https"],
        "User-Agent": ["Go-http-client/2.0"],
        Via: ["http/1.1 Netlify[602e2173-792d-4076-9d6f-4f3d87f02294] (Netlify Edge Server)"],
        "X-Bb-Ab": ["0.659974"],
        "X-Bb-Client-Request-Uuid": ["01FQ2MBCT1ECV7N83VTHCVJXGV"],
        "X-Bb-Ip": ["54.160.225.237"],
        "X-Bb-Loop": ["1"],
        "X-Cdn-Domain": ["www.bitballoon.com"],
        "X-Country": ["US"],
        "X-Datadog-Parent-Id": ["4619288163414554505"],
        "X-Datadog-Sampling-Priority": ["1"],
        "X-Datadog-Trace-Id": ["9883548706603599490"],
        "X-Forwarded-For": ["54.160.225.237, 100.64.0.176"],
        "X-Forwarded-Proto": ["https"],
        "X-Nf-Cdn-Host": ["cdn-reg-aws-jfk-15"],
        "X-Nf-Cdn-Region": ["jfk"],
        "X-Nf-Client-Connection-Ip": ["54.160.225.237"],
        "X-Nf-Connection-Proto": ["https"],
        "X-Nf-Forwarded-Proto": ["https"],
        "X-Nf-Request-Id": ["01FQ2MBCT1ECV7N83VTHCVJXGV"],
        "X-Nf-Request-Start": ["1639692219201385680"],
        host: ["mailshake-dashboard.netlify.app"],
    },
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    body: "recipient=john%40replies.dndroofingco.com&sender=marco.p.fung%40gmail.com&subject=Re%3A+Checking+in+after+this+wind%2C+Daniel&from=Feng+%3Cmarco.p.fung%40gmail.com%3E&X-Mailgun-Incoming=Yes&X-Envelope-From=%3Cmarco.p.fung%40gmail.com%3E&Received=from+mail-ot1-f53.google.com+%28mail-ot1-f53.google.com+%5B209.85.210.53%5D%29+by+mxa.mailgun.org+with+ESMTP+id+61bbb7ba.7f3e6c698330-smtp-in-n02%3B+Thu%2C+16+Dec+2021+22%3A03%3A38+-0000+%28UTC%29&Received=by+mail-ot1-f53.google.com+with+SMTP+id+x19-20020a9d7053000000b0055c8b39420bso600415otj.1++++++++for+%3Cjohn%40replies.dndroofingco.com%3E%3B+Thu%2C+16+Dec+2021+14%3A03%3A38+-0800+%28PST%29&Dkim-Signature=v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3Dgmail.com%3B+s%3D20210112%3B++++++++h%3Dmime-version%3Areferences%3Ain-reply-to%3Afrom%3Adate%3Amessage-id%3Asubject%3Ato%3B++++++++bh%3DklHfmPfu%2BncmTJ0i8M1a%2Fq1yGRv0kJv8ujsn8gqS5tA%3D%3B++++++++b%3DjXCfpx%2BFQVT9kP611bBReaDmfIGakkFe2LOG5d8RJ4WoG9ELnaBbAlrtEI8hJamIB4+++++++++Ph4rVt415tDOBZ8f17AYkESYAYZwqecoaHCiJP4AdxSmhv0zKICsgPPSrwl%2FWm8n1x6n+++++++++yvQruIcWy4seOM5XYK%2B0zJgto3Nc36q2iEdF2V1SdinVRqWNcL7GHFkRgxnAYYINUlLB+++++++++9xDCxygjckVfUWXFrS%2BA5GqZ1qc46Y38qqCodDSOW8KfeELc%2BbzhsfrooYYnZi%2BJj0%2F%2B+++++++++0K9YtKGnp8CYSH8pWZwadh8Xx9XbL533Jp6tth0WR%2FapgKy1iQRAfubvnGpGIweS7CvX+++++++++tDsQ%3D%3D&X-Google-Dkim-Signature=v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3D1e100.net%3B+s%3D20210112%3B++++++++h%3Dx-gm-message-state%3Amime-version%3Areferences%3Ain-reply-to%3Afrom%3Adate+++++++++%3Amessage-id%3Asubject%3Ato%3B++++++++bh%3DklHfmPfu%2BncmTJ0i8M1a%2Fq1yGRv0kJv8ujsn8gqS5tA%3D%3B++++++++b%3DttDq0iZAqr%2BaFGLEf01wZnIJty9h5NePpqjLqs5LSDR4D%2Fz3nSTqT%2F%2FKVsHsEw2jGq+++++++++Jt1s24iXTgrfT%2BxqiXhn8DkTTxsWYXS%2BQmp9eKxXMjscWUXmxKpOiP5Y57q2Tryh0iuL+++++++++z5%2BFG0ECVLnizd3m46gHs8M1esYm137ZJjYsTTMK5LNC8eWlemRWgD6U14SNdEMKYdfo+++++++++bGgERiT2CtA8FEGH%2F%2BHuNPFGd4eDbeWPGFHvblpeOMfcVCBeJIisTa9ax5WU4J331YbU+++++++++UWTYrE9BoAZbSYi2LHhYMyhi4F%2FvgVomhDBm7AQxxeGsBRS7ZgHvBbWYVgCuE1TWhgoy+++++++++J3Kw%3D%3D&X-Gm-Message-State=AOAM533uCTNX%2FMMGDhMPYrPG6DtPYJxzYniu8ZbAvflDojoQd%2B9N%2FH3V%09wiXOeG8QURiLP3iikEXG9ztm6mZ5kBK%2FF7jkV3b6suMw&X-Google-Smtp-Source=ABdhPJy1rhrgTDEd2EbLvuhJF%2FNoLBmm4J5GSZfQl7IyS6pRGC7Wdijp%2BOguOq1F%2Br%2BYUjCv%2BAOHRDNSeyKkhbuJ60g%3D&X-Received=by+2002%3Aa9d%3A4804%3A%3A+with+SMTP+id+c4mr142486otf.82.1639692217695%3B+Thu%2C+16+Dec+2021+14%3A03%3A37+-0800+%28PST%29&Mime-Version=1.0&References=%3C20211216165017.b06509b904e2d20a%40replies.dndroofingco.com%3E&In-Reply-To=%3C20211216165017.b06509b904e2d20a%40replies.dndroofingco.com%3E&From=Feng+%3Cmarco.p.fung%40gmail.com%3E&Date=Thu%2C+16+Dec+2021+14%3A03%3A26+-0800&Message-Id=%3CCACXRAaY-uc359JtqT3-SAyQ6VZ0rAYgwR%2BH2B5KkRVTpkuokBA%40mail.gmail.com%3E&Subject=Re%3A+Checking+in+after+this+wind%2C+Daniel&To=john%40replies.dndroofingco.com&Content-Type=multipart%2Falternative%3B+boundary%3D%220000000000002d41c505d34a98a3%22&message-headers=%5B%5B%22X-Mailgun-Incoming%22%2C+%22Yes%22%5D%2C+%5B%22X-Envelope-From%22%2C+%22%3Cmarco.p.fung%40gmail.com%3E%22%5D%2C+%5B%22Received%22%2C+%22from+mail-ot1-f53.google.com+%28mail-ot1-f53.google.com+%5B209.85.210.53%5D%29+by+mxa.mailgun.org+with+ESMTP+id+61bbb7ba.7f3e6c698330-smtp-in-n02%3B+Thu%2C+16+Dec+2021+22%3A03%3A38+-0000+%28UTC%29%22%5D%2C+%5B%22Received%22%2C+%22by+mail-ot1-f53.google.com+with+SMTP+id+x19-20020a9d7053000000b0055c8b39420bso600415otj.1++++++++for+%3Cjohn%40replies.dndroofingco.com%3E%3B+Thu%2C+16+Dec+2021+14%3A03%3A38+-0800+%28PST%29%22%5D%2C+%5B%22Dkim-Signature%22%2C+%22v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3Dgmail.com%3B+s%3D20210112%3B++++++++h%3Dmime-version%3Areferences%3Ain-reply-to%3Afrom%3Adate%3Amessage-id%3Asubject%3Ato%3B++++++++bh%3DklHfmPfu%2BncmTJ0i8M1a%2Fq1yGRv0kJv8ujsn8gqS5tA%3D%3B++++++++b%3DjXCfpx%2BFQVT9kP611bBReaDmfIGakkFe2LOG5d8RJ4WoG9ELnaBbAlrtEI8hJamIB4+++++++++Ph4rVt415tDOBZ8f17AYkESYAYZwqecoaHCiJP4AdxSmhv0zKICsgPPSrwl%2FWm8n1x6n+++++++++yvQruIcWy4seOM5XYK%2B0zJgto3Nc36q2iEdF2V1SdinVRqWNcL7GHFkRgxnAYYINUlLB+++++++++9xDCxygjckVfUWXFrS%2BA5GqZ1qc46Y38qqCodDSOW8KfeELc%2BbzhsfrooYYnZi%2BJj0%2F%2B+++++++++0K9YtKGnp8CYSH8pWZwadh8Xx9XbL533Jp6tth0WR%2FapgKy1iQRAfubvnGpGIweS7CvX+++++++++tDsQ%3D%3D%22%5D%2C+%5B%22X-Google-Dkim-Signature%22%2C+%22v%3D1%3B+a%3Drsa-sha256%3B+c%3Drelaxed%2Frelaxed%3B++++++++d%3D1e100.net%3B+s%3D20210112%3B++++++++h%3Dx-gm-message-state%3Amime-version%3Areferences%3Ain-reply-to%3Afrom%3Adate+++++++++%3Amessage-id%3Asubject%3Ato%3B++++++++bh%3DklHfmPfu%2BncmTJ0i8M1a%2Fq1yGRv0kJv8ujsn8gqS5tA%3D%3B++++++++b%3DttDq0iZAqr%2BaFGLEf01wZnIJty9h5NePpqjLqs5LSDR4D%2Fz3nSTqT%2F%2FKVsHsEw2jGq+++++++++Jt1s24iXTgrfT%2BxqiXhn8DkTTxsWYXS%2BQmp9eKxXMjscWUXmxKpOiP5Y57q2Tryh0iuL+++++++++z5%2BFG0ECVLnizd3m46gHs8M1esYm137ZJjYsTTMK5LNC8eWlemRWgD6U14SNdEMKYdfo+++++++++bGgERiT2CtA8FEGH%2F%2BHuNPFGd4eDbeWPGFHvblpeOMfcVCBeJIisTa9ax5WU4J331YbU+++++++++UWTYrE9BoAZbSYi2LHhYMyhi4F%2FvgVomhDBm7AQxxeGsBRS7ZgHvBbWYVgCuE1TWhgoy+++++++++J3Kw%3D%3D%22%5D%2C+%5B%22X-Gm-Message-State%22%2C+%22AOAM533uCTNX%2FMMGDhMPYrPG6DtPYJxzYniu8ZbAvflDojoQd%2B9N%2FH3V%5CtwiXOeG8QURiLP3iikEXG9ztm6mZ5kBK%2FF7jkV3b6suMw%22%5D%2C+%5B%22X-Google-Smtp-Source%22%2C+%22ABdhPJy1rhrgTDEd2EbLvuhJF%2FNoLBmm4J5GSZfQl7IyS6pRGC7Wdijp%2BOguOq1F%2Br%2BYUjCv%2BAOHRDNSeyKkhbuJ60g%3D%22%5D%2C+%5B%22X-Received%22%2C+%22by+2002%3Aa9d%3A4804%3A%3A+with+SMTP+id+c4mr142486otf.82.1639692217695%3B+Thu%2C+16+Dec+2021+14%3A03%3A37+-0800+%28PST%29%22%5D%2C+%5B%22Mime-Version%22%2C+%221.0%22%5D%2C+%5B%22References%22%2C+%22%3C20211216165017.b06509b904e2d20a%40replies.dndroofingco.com%3E%22%5D%2C+%5B%22In-Reply-To%22%2C+%22%3C20211216165017.b06509b904e2d20a%40replies.dndroofingco.com%3E%22%5D%2C+%5B%22From%22%2C+%22Feng+%3Cmarco.p.fung%40gmail.com%3E%22%5D%2C+%5B%22Date%22%2C+%22Thu%2C+16+Dec+2021+14%3A03%3A26+-0800%22%5D%2C+%5B%22Message-Id%22%2C+%22%3CCACXRAaY-uc359JtqT3-SAyQ6VZ0rAYgwR%2BH2B5KkRVTpkuokBA%40mail.gmail.com%3E%22%5D%2C+%5B%22Subject%22%2C+%22Re%3A+Checking+in+after+this+wind%2C+Daniel%22%5D%2C+%5B%22To%22%2C+%22john%40replies.dndroofingco.com%22%5D%2C+%5B%22Content-Type%22%2C+%22multipart%2Falternative%3B+boundary%3D%5C%220000000000002d41c505d34a98a3%5C%22%22%5D%5D&body-plain=Hi%2C+This+is+not+Daniel....+please+check+again.%0D%0A%0D%0AThanks%21%0D%0A%0D%0AOn+Thu%2C+Dec+16%2C+2021+at+8%3A50+AM+John+Deal+%3Cjohn%40dndroofingco.com%3E+wrote%3A%0D%0A%0D%0A%3E+Hi+Daniel%2C%0D%0A%3E%0D%0A%3E+With+the+winds+we+just+had%2C+I+wanted+to+check+in+and+see+how+your+roof%0D%0A%3E+held+up%3F%0D%0A%3E%0D%0A%3E+Please+let+me+know+how+I+can+help+you.%0D%0A%3E%0D%0A%3E+Thanks%2C%0D%0A%3E%0D%0A%3E+%2AJohn+Deal%2A%0D%0A%3E%0D%0A%3E+%2AD%26D+Roofing%2A%0D%0A%3E%0D%0A%3E+%2AColorado+Springs%2C+CO%2A%0D%0A%3E%0D%0A%3E+%2A%28719%29+224-6111%2A%0D%0A%3E%0D%0A%3E+%2ACopyright+%C2%A9+2021++Deal+and+Deal+Roofing+Consultants%2C+All+rights+reserved.%2A%0D%0A%3E%0D%0A%3E+%2AOur+mailing+address+is%3A%2A%0D%0A%3E%0D%0A%3E%0D%0A%3E+Want+to+change+how+you+receive+these+emails%3F%0D%0A%3E+You+can+unsubscribe+from+this+list%0D%0A%3E+%3Chttp%3A%2F%2Femail.replies.dndroofingco.com%2Fc%2FeJx1T8tugzAQ_Bo4ItsQGw4c0pI-lEKoIiVRLhHGa3DEKzZQpV9fo7THSivtzmh2ZlfELCQEfFfFBBGMCaaYrhBmHke2RzxCARBBUOEESMPQKDCe6ITue6m6quy9sm_dOhbSDwMKkRA-i0TEWCApQ6tSYiyp4MJt4nocB-P4a4e82DKgZ1Vas9ZUxvotPpaGtlDNhU-qEaAtnvEfaewwdWbiptSKg0WZTpp8PqWH2-b-nerddM3YsrK6njNO07xbP72-yc05fw-XTP_h4_hJW2h7-ODJqavsW9VCP_LpCO3QFCNclLDC5-Bjz29ZXaLkMPOvCLbT0YpaMKaofjX48xRs90U9JudTvuvofXOUro7_y_gBOcV3LQ%3E%0D%0A%3E+.%0D%0A%3E%0D%0A%0D%0A%0D%0A--+%0D%0APeijie+Feng%0D%0A&body-html=%3Cdiv+dir%3D%22ltr%22%3EHi%2C+This+is+not+Daniel....+please+check+again.%3Cdiv%3E%3Cbr%3E%3C%2Fdiv%3E%3Cdiv%3EThanks%21%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cbr%3E%3Cdiv+class%3D%22gmail_quote%22%3E%3Cdiv+dir%3D%22ltr%22+class%3D%22gmail_attr%22%3EOn+Thu%2C+Dec+16%2C+2021+at+8%3A50+AM+John+Deal+%26lt%3B%3Ca+href%3D%22mailto%3Ajohn%40dndroofingco.com%22%3Ejohn%40dndroofingco.com%3C%2Fa%3E%26gt%3B+wrote%3A%3Cbr%3E%3C%2Fdiv%3E%3Cblockquote+class%3D%22gmail_quote%22+style%3D%22margin%3A0px+0px+0px+0.8ex%3Bborder-left%3A1px+solid+rgb%28204%2C204%2C204%29%3Bpadding-left%3A1ex%22%3E%3Cdiv+style%3D%22font-family%3Averdana%2Cgeneva%3Bfont-size%3A11pt%22%3E%0D%0A++++%3Cu%3E%3C%2Fu%3E%0D%0A++++%0D%0A++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++%0D%0A%0D%0A++++%0D%0A++++++++%0D%0A++++%0D%0A++++%0D%0A++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++++%0D%0A++++++%0D%0A++++++%3Cdiv+style%3D%22word-spacing%3Anormal%3Bbackground-color%3Argb%28234%2C240%2C246%29%22%3E%0D%0A++++++++%0D%0A++++++++%0D%0A++++++%3Cdiv+style%3D%22background-color%3Argb%28234%2C240%2C246%29%22%3E%0D%0A++++++++%0D%0A++++++%0D%0A++++++%0D%0A++++%0D%0A++++++%0D%0A++++++%3Cdiv+style%3D%22background%3Argb%28255%2C255%2C255%29%3Bmargin%3A0px+auto%3Bmax-width%3A600px%22%3E%0D%0A++++++++%0D%0A++++++++%3Ctable+align%3D%22center%22+border%3D%220%22+cellpadding%3D%220%22+cellspacing%3D%220%22+role%3D%22presentation%22+style%3D%22background%3Argb%28255%2C255%2C255%29%3Bwidth%3A100%25%22%3E%0D%0A++++++++++%3Ctbody%3E%0D%0A++++++++++++%3Ctr%3E%0D%0A++++++++++++++%3Ctd+style%3D%22direction%3Altr%3Bfont-size%3A0px%3Bpadding%3A10px+20px%3Btext-align%3Acenter%22%3E%0D%0A++++++++++++++++%0D%0A++++++++++++%0D%0A++++++%3Cdiv+class%3D%22gmail-m_1617264607887753870mj-column-per-100%22+style%3D%22font-size%3A0px%3Btext-align%3Aleft%3Bdirection%3Altr%3Bdisplay%3Ainline-block%3Bvertical-align%3Atop%3Bwidth%3A100%25%22%3E%0D%0A++++++++%0D%0A++++++%3Ctable+border%3D%220%22+cellpadding%3D%220%22+cellspacing%3D%220%22+role%3D%22presentation%22+style%3D%22vertical-align%3Atop%22+width%3D%22100%25%22%3E%0D%0A++++++++%3Ctbody%3E%0D%0A++++++++++%0D%0A++++++++++++++%3Ctr%3E%0D%0A++++++++++++++++%3Ctd+align%3D%22left%22+style%3D%22font-size%3A0px%3Bpadding%3A10px+20px%3Bword-break%3Abreak-word%22%3E%0D%0A++++++++++++++++++%0D%0A++++++%3Cdiv+style%3D%22font-family%3AUbuntu%2CHelvetica%2CArial%2Csans-serif%3Bfont-size%3A13px%3Bline-height%3A1%3Btext-align%3Aleft%3Bcolor%3Argb%280%2C0%2C0%29%22%3E%3Cp%3E%3Cspan+style%3D%22font-size%3A14px%22%3EHi+Daniel%2C+%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3Cp%3E%3Cspan+style%3D%22font-size%3A14px%22%3EWith+the+winds+we+just+had%2C+I+wanted+to+check+in+and+see+how+your+roof+held+up%3F%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3Cp%3E%3Cspan+style%3D%22font-size%3A14px%22%3EPlease+let+me+know+how+I+can+help+you.%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3Cp%3E%3Cspan+style%3D%22font-size%3A14px%22%3EThanks%2C%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3Cp%3E%3Cstrong%3E%3Cspan+style%3D%22font-size%3A14px%22%3EJohn+Deal%3C%2Fspan%3E%3C%2Fstrong%3E%3C%2Fp%3E%0D%0A%3Cp%3E%3Cstrong%3E%3Cspan+style%3D%22font-size%3A14px%22%3ED%26amp%3BD+Roofing%3C%2Fspan%3E%3C%2Fstrong%3E%3C%2Fp%3E%0D%0A%3Cp%3E%3Cstrong%3E%3Cspan+style%3D%22font-size%3A14px%22%3EColorado+Springs%2C+CO%3C%2Fspan%3E%3C%2Fstrong%3E%3C%2Fp%3E%0D%0A%3Cp%3E%3Cstrong%3E%3Cspan+style%3D%22font-size%3A14px%22%3E%28719%29+224-6111%3C%2Fspan%3E%3C%2Fstrong%3E%3C%2Fp%3E%3C%2Fdiv%3E%0D%0A++++%0D%0A++++++++++++++++%3C%2Ftd%3E%0D%0A++++++++++++++%3C%2Ftr%3E%0D%0A++++++++++++%0D%0A++++++++%3C%2Ftbody%3E%0D%0A++++++%3C%2Ftable%3E%0D%0A++++%0D%0A++++++%3C%2Fdiv%3E%0D%0A++++%0D%0A++++++++++%0D%0A++++++++++++++%3C%2Ftd%3E%0D%0A++++++++++++%3C%2Ftr%3E%0D%0A++++++++++%3C%2Ftbody%3E%0D%0A++++++++%3C%2Ftable%3E%0D%0A++++++++%0D%0A++++++%3C%2Fdiv%3E%0D%0A++++%0D%0A++++++%0D%0A++++++%0D%0A++++%0D%0A++++++%0D%0A++++++%3Cdiv+style%3D%22background%3Argb%2842%2C67%2C101%29%3Bmargin%3A0px+auto%3Bmax-width%3A600px%22%3E%0D%0A++++++++%0D%0A++++++++%3Ctable+align%3D%22center%22+border%3D%220%22+cellpadding%3D%220%22+cellspacing%3D%220%22+role%3D%22presentation%22+style%3D%22background%3Argb%2842%2C67%2C101%29%3Bwidth%3A100%25%22%3E%0D%0A++++++++++%3Ctbody%3E%0D%0A++++++++++++%3Ctr%3E%0D%0A++++++++++++++%3Ctd+style%3D%22direction%3Altr%3Bfont-size%3A0px%3Bpadding%3A10px+20px%3Btext-align%3Acenter%22%3E%0D%0A++++++++++++++++%0D%0A++++++++++++%0D%0A++++++%3Cdiv+class%3D%22gmail-m_1617264607887753870mj-column-per-100%22+style%3D%22font-size%3A0px%3Btext-align%3Aleft%3Bdirection%3Altr%3Bdisplay%3Ainline-block%3Bvertical-align%3Atop%3Bwidth%3A100%25%22%3E%0D%0A++++++++%0D%0A++++++%3Ctable+border%3D%220%22+cellpadding%3D%220%22+cellspacing%3D%220%22+role%3D%22presentation%22+style%3D%22vertical-align%3Atop%22+width%3D%22100%25%22%3E%0D%0A++++++++%3Ctbody%3E%0D%0A++++++++++%0D%0A++++++++++++++%3Ctr%3E%0D%0A++++++++++++++++%3Ctd+align%3D%22left%22+style%3D%22font-size%3A0px%3Bpadding%3A10px+20px%3Bword-break%3Abreak-word%22%3E%0D%0A++++++++++++++++++%0D%0A++++++%3Cdiv+style%3D%22font-family%3AUbuntu%2CHelvetica%2CArial%2Csans-serif%3Bfont-size%3A13px%3Bline-height%3A1%3Btext-align%3Aleft%3Bcolor%3Argb%280%2C0%2C0%29%22%3E%3Cp+style%3D%22text-align%3Acenter%22%3E%3Cspan+style%3D%22font-size%3A10pt%3Bcolor%3Argb%28236%2C240%2C241%29%22%3E%3Cem%3ECopyright+%C2%A9+2021%26nbsp%3B+Deal+and+Deal+Roofing+Consultants%2C+All+rights+reserved.%3C%2Fem%3E%3C%2Fspan%3E%3Cbr%3E%3Cbr%3E%3Cspan+style%3D%22font-size%3A10pt%3Bcolor%3Argb%28255%2C255%2C255%29%22%3E%3Cstrong%3EOur+mailing+address+is%3A%3C%2Fstrong%3E%3C%2Fspan%3E%3Cbr%3E%3Cspan+style%3D%22font-size%3A10pt%3Bcolor%3Argb%28255%2C255%2C255%29%22%3E%3C%2Fspan%3E%3Cbr%3E%3Cbr%3E%3Cspan+style%3D%22font-size%3A10pt%3Bcolor%3Argb%28255%2C255%2C255%29%22%3EWant+to+change+how+you+receive+these+emails%3F%3C%2Fspan%3E%3Cbr%3E%3Cspan+style%3D%22font-size%3A10pt%3Bcolor%3Argb%28255%2C255%2C255%29%22%3EYou+can+%3Ca+style%3D%22color%3Argb%28255%2C255%2C255%29%22+href%3D%22http%3A%2F%2Femail.replies.dndroofingco.com%2Fc%2FeJx1T8tugzAQ_Bo4ItsQGw4c0pI-lEKoIiVRLhHGa3DEKzZQpV9fo7THSivtzmh2ZlfELCQEfFfFBBGMCaaYrhBmHke2RzxCARBBUOEESMPQKDCe6ITue6m6quy9sm_dOhbSDwMKkRA-i0TEWCApQ6tSYiyp4MJt4nocB-P4a4e82DKgZ1Vas9ZUxvotPpaGtlDNhU-qEaAtnvEfaewwdWbiptSKg0WZTpp8PqWH2-b-nerddM3YsrK6njNO07xbP72-yc05fw-XTP_h4_hJW2h7-ODJqavsW9VCP_LpCO3QFCNclLDC5-Bjz29ZXaLkMPOvCLbT0YpaMKaofjX48xRs90U9JudTvuvofXOUro7_y_gBOcV3LQ%22+target%3D%22_blank%22%3Eunsubscribe+from+this+list%3C%2Fa%3E.%3C%2Fspan%3E%3C%2Fp%3E%3C%2Fdiv%3E%0D%0A++++%0D%0A++++++++++++++++%3C%2Ftd%3E%0D%0A++++++++++++++%3C%2Ftr%3E%0D%0A++++++++++++%0D%0A++++++++%3C%2Ftbody%3E%0D%0A++++++%3C%2Ftable%3E%0D%0A++++%0D%0A++++++%3C%2Fdiv%3E%0D%0A++++%0D%0A++++++++++%0D%0A++++++++++++++%3C%2Ftd%3E%0D%0A++++++++++++%3C%2Ftr%3E%0D%0A++++++++++%3C%2Ftbody%3E%0D%0A++++++++%3C%2Ftable%3E%0D%0A++++++++%0D%0A++++++%3C%2Fdiv%3E%0D%0A++++%0D%0A++++++%0D%0A++++++%0D%0A++++%0D%0A++++%0D%0A++++++%3C%2Fdiv%3E%0D%0A++++%0D%0A++++++%3Cimg+width%3D%221px%22+height%3D%221px%22+alt%3D%22%22+src%3D%22http%3A%2F%2Femail.replies.dndroofingco.com%2Fo%2FeJwVjEkOwyAMAF9Tjsg4LOHAYwBjihQgIur_Q09zmRkK7kQsh2gBAZVCZZU1oJxMsOmTB12QEOJHwyr31cojadCak9uoeco8u_gG8NYkZEajwXLeJ3LuoB0zYTEsVuhxbf2W_Bt1z2qP7frXL2S8Ju8%22%3E%3C%2Fdiv%3E%0D%0A++++%0D%0A++%3C%2Fdiv%3E%3C%2Fblockquote%3E%3C%2Fdiv%3E%3Cbr+clear%3D%22all%22%3E%3Cdiv%3E%3Cbr%3E%3C%2Fdiv%3E--+%3Cbr%3E%3Cdiv+dir%3D%22ltr%22+class%3D%22gmail_signature%22%3EPeijie+Feng%3Cbr%3E%3C%2Fdiv%3E%0D%0A&stripped-text=Hi%2C+This+is+not+Daniel....+please+check+again.&stripped-html=%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3Cdiv+dir%3D%22ltr%22%3EHi%2C+This+is+not+Daniel....+please+check+again.%3Cdiv%3E%3Cbr%3E%3C%2Fdiv%3E%3Cdiv%3EThanks%21%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cbr%3E%3Cbr+clear%3D%22all%22%3E%3Cdiv%3E%3Cbr%3E%3C%2Fdiv%3E--+%3Cbr%3E%3Cdiv+class%3D%22gmail_signature%22+dir%3D%22ltr%22%3EPeijie+Feng%3Cbr%3E%3C%2Fdiv%3E%0A%3C%2Fbody%3E%3C%2Fhtml%3E&stripped-signature=Thanks%21%0D%0A%0D%0A--+%0D%0APeijie+Feng&timestamp=1639692219&token=48f0a0ed8793cddcb326e12f943e38292e8eaf72af0558232e&signature=2b0a4caf43bc053b7c45c49cee3fdabed7a95ab5594acbab54bb84611737779a",
    isBase64Encoded: false,
};

console.log(res.body);

// (async () => {
//     try {
//         // TODO: get baseID from 'from' email
//         // TODO:
//     } catch (error) {
//         console.log(error);
//     }
// })();
