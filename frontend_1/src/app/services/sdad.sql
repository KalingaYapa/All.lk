SELECT up.USER_ID,
            u.PROFILE_ID,
            u.STATUS,
            r.TITLE,
            r.FIRST_NAME,
            r.LAST_NAME,
            up.CURRENT_PACKAGE,
             up.SUBSCRIPTION_RENEWAL_DATE,
             up.SUBSCRIPTION_START_DATE,
             up.RENEWAL_REQUESTED_DATE,
             u.LEAD_SOURCE,
             l.URL,
             r.USERNAME,
             r.EMAIL,
             r.PHONE,
             r.WORK_TEL,
             r.COUNTRY,
             r.CITY,
             r.ADDRESS_1,
             r.ADDRESS_2,
             r.COMPANY,
             r.DESIGNATION
            FROM RETAIL_USER_DETAILS
            LEFT JOIN USR_INVOICE u on (r.RETAIL_ID = u.PROFILE_ID)
            LEFT JOIN USR_PREMIUM_ACCOUNT_DETAILS up ON (u.USER_ID = up.USER_ID)
            LEFT JOIN LEAD_SOURCES l ON (l.LEAD_SOURCE = u.LEAD_SOURCE)
            WHERE u.STATUS = 1 and up.USER_ID IS NOT NULL
            ORDER BY u.USER_ID
