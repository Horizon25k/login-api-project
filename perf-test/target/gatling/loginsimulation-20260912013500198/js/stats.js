var stats = {
    type: "GROUP",
name: "All Requests",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "All Requests",
    "numberOfRequests": {
        "total": "6300",
        "ok": "6300",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "39",
        "ok": "39",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "564",
        "ok": "564",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "224",
        "ok": "224",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "72",
        "ok": "72",
        "ko": "-"
    },
    "percentiles1": {
        "total": "220",
        "ok": "220",
        "ko": "-"
    },
    "percentiles2": {
        "total": "285",
        "ok": "285",
        "ko": "-"
    },
    "percentiles3": {
        "total": "334",
        "ok": "334",
        "ko": "-"
    },
    "percentiles4": {
        "total": "373",
        "ok": "373",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 6300,
    "percentage": 100
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "52.5",
        "ok": "52.5",
        "ko": "-"
    }
},
contents: {
"req_post--api-auth--abe8b": {
        type: "REQUEST",
        name: "POST /api/auth/register",
path: "POST /api/auth/register",
pathFormatted: "req_post--api-auth--abe8b",
stats: {
    "name": "POST /api/auth/register",
    "numberOfRequests": {
        "total": "3150",
        "ok": "3150",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "115",
        "ok": "115",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "564",
        "ok": "564",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "288",
        "ok": "288",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "39",
        "ok": "39",
        "ko": "-"
    },
    "percentiles1": {
        "total": "285",
        "ok": "285",
        "ko": "-"
    },
    "percentiles2": {
        "total": "307",
        "ok": "307",
        "ko": "-"
    },
    "percentiles3": {
        "total": "353",
        "ok": "353",
        "ko": "-"
    },
    "percentiles4": {
        "total": "386",
        "ok": "386",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 3150,
    "percentage": 100
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "26.25",
        "ok": "26.25",
        "ko": "-"
    }
}
    },"req_post--api-auth--984a4": {
        type: "REQUEST",
        name: "POST /api/auth/login",
path: "POST /api/auth/login",
pathFormatted: "req_post--api-auth--984a4",
stats: {
    "name": "POST /api/auth/login",
    "numberOfRequests": {
        "total": "3150",
        "ok": "3150",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "39",
        "ok": "39",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "413",
        "ok": "413",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "161",
        "ok": "161",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "30",
        "ok": "30",
        "ko": "-"
    },
    "percentiles1": {
        "total": "165",
        "ok": "165",
        "ko": "-"
    },
    "percentiles2": {
        "total": "182",
        "ok": "182",
        "ko": "-"
    },
    "percentiles3": {
        "total": "207",
        "ok": "207",
        "ko": "-"
    },
    "percentiles4": {
        "total": "227",
        "ok": "227",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 3150,
    "percentage": 100
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "26.25",
        "ok": "26.25",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
