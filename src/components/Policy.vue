<template>
  <div style="display: flex">
    <q-btn flat @click="$emit('openShort')">
      <q-icon size="64px" name="arrow_back"/>
    </q-btn>
    <h1>Privacy Policy</h1>
  </div>
  <h2>This Privacy Policy explains how we collect, use, process, and disclose your information when you use the RIFGO
    Services.</h2>
  <p>The Privacy statement applies to anyone who accesses the RIFGO sites and app, collectively known as “RIFGO
    Services”. When you subscribe to the RIFGO Services or otherwise use our Services you expressly agree to this
    Privacy Policy.</p>

  <p>The terms “we”, “us”, and “our” herein shall refer to the RIFGO Company. Any undefined term in this Privacy Policy
    shall have the same meaning as that defined in the Terms of Service.</p>

  <p>The Site or App may contain links to third party websites. We are not responsible for the privacy practices or the
    content of those websites or persons.</p>

  <p>This Privacy Policy was last updated on November 5, 2021 GMT. This Privacy Policy applies from said date. This
    policy may be amended to reflect regulatory requirements, advances in technology, Site or App updates and changes in
    our personal information management practices. Any new policy will automatically be effective when it is published
    on the application or website, which will also be reflected in the last updated date and time.</p>

  <h2>Information We Collect</h2>
  <p>Information Your Provide Us: We collect information that you share directly with us. This may include information
    you provide when you create or modify your account, interact with customer support, make requests through our site
    or connected services, and make any other communications directly with RIFGO. This information may include your
    name, phone number, email address, home address, payment method, identity-authentication information (such as that
    contained on a government issued ID or passport), listing details, item details, and other information that you
    voluntarily provide us.</p>

  <p>Usage and Preference Information: We collect information about how you and other site visitors interact with and
    use the RIFGO Services, such as the pages or other content you view, your searches for listings, bookings that you
    have made, and other actions you take on our Service. In some cases we collect this information through the use of
    cookies, pixel tags, and other related technologies. To learn more about cookies and other related technologies see
    “Cookies and Other Related Technologies” below.</p>

  <p>Log Data: When you interact with our Services, we collect log information, even if you have not created a RIFGO
    account. Log information may include detail about how you use the Services (including links to third party
    services), access dates and times, device IP addresses, app features or pages viewed, type of browser, device
    information, app crashes or other system activity, and the third-party site or services you were using before
    interacting with our services.</p>

  <h2>Information We Collect from Third-Parties</h2>
  <p>We also collect information from other sources in addition to those collected through our services. When you create
    or link your account through Facebook or Google we may receive information such as your registration and profile
    information. The information we receive varies by and is controlled by the service itself or as authorized by you in
    your privacy settings at that service.</p>

  <h2>How We Use Information</h2>
  <p>We use the information you provide us to provide, improve, and develop the RIFGO Services. Some examples of how
    RIFGO uses collected information include:</p>

  <ul>
    <li>Enable you to use the RIFGO Services</li>
    <li>Enable you to communicate with other members</li>
    <li>Provide customer service</li>
    <li>Perform analytics to provide and optimize your RIFGO experience</li>
    <li>Send you account notifications, such as support messages and security alerts</li>
  </ul>

  <p>RIFGO also uses the information you provide us to improve the security and safety of our Services, including:</p>
  <ul>
    <li>To detect and prevent spam, fraud, abuse, and other harmful incidents</li>
    <li>Verify or authenticate identities and information provided by you</li>
    <li>Comply with our legal obligations</li>
    <li>Perform security checks against other information sources</li>
    <li>Investigate sources of risk and member complaints</li>
    <li>Resolve any disputes with any of our users or with third parties</li>
    <li>Enforce the Terms of Service</li>
  </ul>

  <h2>Widgets</h2>
  <p>We may use technologies such as widgets or API’s to display parts of our services (e.g., your Listing page) on
    sites that are operated by our business partners. Listings displayed on a business partners’ site only include the
    information you provide in your public RIFGO Listings.</p>

  <h2>Information We Share</h2>
  <p>Compliance with Law: RIFGO cooperates with law enforcement activities, and may pass your personal information upon
    legal demand by law enforcement. In the event that RIFGO is acquired, sold, liquidated, or enters bankruptcy,
    personal information will be transferred to the purchasing or managing entity with the expectation that equal or
    greater privacy controls will be maintained for all personal information transferred.</p>

  <p>Service Providers: RIFGO transfers data necessary in carrying out your requests, and processing payment information
    through its vendors. RIFGO does not transfer any additional personal information to third parties.</p>

  <p>Sharing between Hosts and Renters: We may also share information between Hosts and Renters to facilitate the
    booking process and give you access and control during your renting or hosting experience. Such information as your
    full name, telephone number, email address, and the address of the Space to be rented (if you are a Host) will be
    shared between the two parties upon a confirmed booking of a Space.</p>

  <p>Public Listings and Profiles: In order to advertise your Listings and assure customer safety, we make certain
    information available for public access via the RIFGO services. The information on public Listings and Profiles may
    include information such as your first name, your description of the Space, your general description of yourself,
    the general area in which your Space is located, a verified ID status (if we have verified your identity via
    documentation you have provided us), a verified Host status (if you have previously hosted with RIFGO), and any
    other information you choose to provide in your public Profile or Listing.</p>

  <p>Aggregated or Anonymized Data: We may also share aggregated data (data we combine about our users so that it can no
    longer can identify or reference any individual user) and other anonymized data for business purposes such as
    marketing, market and industry analysis, demographic profiling, and other business practices.</p>

  <h2>Cookies and Other Related Technologies</h2>
  <p>The RIFGO Services use third-party cookies, web beacons, and other related technologies. Cookies are small text
    files that are stored on your browser or device that can perform functions such as recognize your browser and store
    your preferences. These technologies provide valuable information on how you use our Services and they enable us to
    enhance your user experience.</p>

  <p>Most browsers automatically allow cookies, however you can choose whether or not to accept cookies by modifying
    your browser or device settings.</p>

  <p>Cookies are an important part of our Services’ functionality and disabling cookies may affect how you view or
    interact with our services.Flash cookies are different from browser cookies and cannot be disabled via your browser
    settings. For more information on disabling flash cookies you can visit
    https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html .</p>
</template>

<script>
export default {
  name: 'Policy',
  emits: ['openShort']
}
</script>

<style lang="scss">
.terms-modal {

  h1 {
    font-size: 64px;
    line-height: 1.23;
  }

  h2 {
    line-height: 1.55;
    font-size: 22px;
  }

  h1, h2 {
    color: #333333;
    font-weight: 700;
  }
}
</style>
