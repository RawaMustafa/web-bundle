
import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']

}


export default function middleware(req: any,) {



    // const backendCookies = req.headers.get("cookie")?.includes('Authorization="Bearer ')
    // // const nextAuthCookies = req.headers.get("cookie")?.includes('__Secure-next-auth.session-token')
    // const nextAuthCookies = req.headers.get("cookie")?.includes('next-auth.session-token')


    // if (!backendCookies && nextAuthCookies) {

    //     return new NextResponse(null, {
    //         status: 302,
    //         headers: {
    //             'Set-Cookie': `next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=Lax`,
    //             // 'Set-Cookie': `__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=Lax`,
    //             'Location': (new URL('/Login', req.url)).toString()
    //         }
    //     })

    // }





    let lng
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = fallbackLng

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc: any) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer'))
        const lngInReferer = languages.find((l: any) => refererUrl.pathname.startsWith(`/${l}`))
        const response = NextResponse.next()
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
        return response
    }


    return NextResponse.next()
}