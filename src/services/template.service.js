const templateModel = require("../models/template.model");
const { sampleHTML } = require("../utils/sample.html");

class TemplateService {
    async newTemplate({
        template_name = '',
        template_id = '1',
        template_html = ''
    }) {
        return await templateModel.create({
            template_id,
            template_name,
            template_html: sampleHTML()
        })
    }

    async getTemplate({
        template_name
    }) {
        return await templateModel.findOne({
            template_name
        })
    }
}

module.exports = new TemplateService();