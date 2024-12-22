const utm = require('../models/utm.Model');

const utmController = {
    createUtm: async (req, res) => {
        try {
            const {
                baseUrl,     // The base URL of your website or landing page where traffic is directed.
                source,      // The specific source of the traffic (e.g., 'facebook', 'instagram', 'google').
                medium,      // The marketing medium or channel (e.g., 'social', 'email', 'influencer', 'cpc').
                campaign,    // The name of the specific campaign driving traffic (e.g., 'new_launch', 'holiday_sale_johnDoe').
                couponCode   //A unique coupon or promotional code associated with the campaign.
            } = req.body;
            // const utmUrl = `${baseUrl}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
            const utmUrl = `${baseUrl}?utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}${couponCode ? `&couponCode=${encodeURIComponent(couponCode)}` : ''}`;

            const newUtm = await utm.create({ baseUrl, source, medium, campaign, utmUrl, couponCode })
            res.status(201).json({ status: true, message: "Link Generated Successfully", data: newUtm });
        } catch (error) {
            console.error("Error while generating the link");
            req.status(500).json({ status: false, message: "Internal Server Error" });
        }
    },
    getUtm: async (req, res) => {
        try {
            const { id, source, couponCode, offset = 0, limit = 10 } = req.query;
            const whereCondition = {};

            if (id) whereCondition.id = id;
            if (source) whereCondition.source = source;
            if (couponCode) whereCondition.couponCode = couponCode;

            const utmLinks = await utm.findAll({
                where: whereCondition,
                offset: parseInt(offset) || 0,
                limit: parseInt(limit) || 10
            });
            res.status(200).json({ status: true, message: "Success", data: utmLinks });
        } catch (error) {
            console.error("Error while getting the link");
            req.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}

module.exports = utmController;