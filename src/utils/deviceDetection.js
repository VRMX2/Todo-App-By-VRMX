// Mobile device detection utility
export const isMobileDevice = () => {
    // Check screen width
    const isMobileWidth = window.innerWidth <= 768;

    // Check user agent for mobile devices
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    return isMobileWidth || isMobileUA;
};

export const getDeviceType = () => {
    const width = window.innerWidth;

    if (width <= 480) return 'mobile-small';
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
};
